import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Button, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowAlert: true,
		};
	}
});

const App = () => {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [courseGoals, setCourseGoals] = useState([]);
	const [pushToken, setPushToken] = useState('');

	useEffect(() => {
		const configurePushNotifications = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;

			if (finalStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				Alert.alert(
					'Permission required',
					'Push Notifications need the appropriate permissions.'
				);
				return;
			}

			const tokenPushData = await Notifications.getExpoPushTokenAsync();

			console.log(tokenPushData);
			setPushToken(tokenPushData);

			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.DEFAULT
				});
			}

		};

		configurePushNotifications();

	}, []);

	useEffect(() => {
		const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
			const userName = notification.request.content.data.userName;
			console.log(userName);
		});

		const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
			const userName = response.notification.request.content.data.userName;
		});

		return () => {
			subscription1.remove();
			subscription2.remove();
		};
	}, []);

	const startAddGoalHandler = () => {
		setModalIsVisible(prev => !prev);
	};

	const addGoalHandler = (enteredGoalText) => {
		setCourseGoals(prev => [...prev, { text: enteredGoalText, id: Math.random().toString() }]);
		startAddGoalHandler();
	};

	const deleteGoalHandler = (id) => () => {
		setCourseGoals(prev => prev.filter(item => item.id !== id));
	};

	const scheduleNotificationHandler = () => {
		Notifications.scheduleNotificationAsync({
			content: {
				title: 'My first local notification',
				body: 'This is a body of the notification',
				data: { userName: 'Max' }
			},
			trigger: {
				seconds: 5,
			}
		});
	};

	const sendPushNotificationHandler = () => {
		fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				to: pushToken,
				title: 'Test - sent from a device!',
				body: 'This is a test!'
			})
		}).then(res => console.log(res, 'res'))
	};

	return (
		<>
			<StatusBar style="light"/>
			<View style={styles.appContainer}>
				<Button
					title="Add New Goal"
					color="#a065ec"
					onPress={startAddGoalHandler}
				/>
				<GoalInput
					visible={modalIsVisible}
					onAddGoal={addGoalHandler}
					onCancel={startAddGoalHandler}
				/>
				<View style={styles.goalsContainer}>
					<FlatList
						data={courseGoals}
						renderItem={itemData => (
							<GoalItem
								id={itemData.item.id}
								text={itemData.item.text}
								onDeleteItem={deleteGoalHandler}
							/>)}
						keyExtractor={item => item.id}
						alwaysBounceVertical={false}
					/>
				</View>
				<Button title="Schedule Notification" onPress={scheduleNotificationHandler}/>
				<Button title="Send Push Notification" onPress={sendPushNotificationHandler}/>
			</View>
		</>
	);
};

export default App;

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16
	},
	goalsContainer: {
		flex: 5
	}
});