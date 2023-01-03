import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Keyboard, Modal, Image } from 'react-native';

const GoalInput = ({ visible, onAddGoal, onCancel }) => {
	const [enteredGoalText, setEnteredGoalText] = useState('');

	const goalInputHandler = (enteredText) => {
		setEnteredGoalText(enteredText);
	};

	const addGoalWrapperHandler = () => {
		if (Boolean(enteredGoalText)) {
			onAddGoal(enteredGoalText);
			setEnteredGoalText('');
			Keyboard.dismiss();
		}
	};

	return (
		<Modal visible={visible} animationType="slide">
			<View style={styles.inputContainer}>
				<Image style={styles.image} source={require('../../assets/imgs/goal.png')} />
				<TextInput
					style={styles.textInput}
					value={enteredGoalText}
					onChangeText={goalInputHandler}
					placeholder="Your course goal"/>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button
							onPress={onCancel}
							title="Cancel"
							color='#f31282'
						/>
					</View>
					<View style={styles.button}>
						<Button
							onPress={addGoalWrapperHandler}
							title="Add goal"
							color='#b180f0'
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default GoalInput;

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#311b6b'
	},
	image: {
		width: 100,
		height: 100,
		margin: 20
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#e4d0ff',
		backgroundColor: '#e4d0ff',
		color: '#120438',
		borderRadius: 6,
		width: '100%',
		padding: 16,
	},
	buttonContainer: {
		marginTop: 16,
		flexDirection: 'row'
	},
	button: {
		width: 100,
		marginHorizontal: 8
	}
});