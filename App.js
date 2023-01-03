import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

const App = () => {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [courseGoals, setCourseGoals] = useState([]);

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

	return (
		<>
			<StatusBar style='light' />
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