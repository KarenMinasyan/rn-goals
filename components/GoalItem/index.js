import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const GoalItem = ({ id, text, onDeleteItem }) => (
	<View style={styles.goalItem}>
		<Pressable
			style={({ pressed }) => pressed && styles.pressedItem}
			android_ripple={{ color: '#ddd' }}
			onPress={onDeleteItem(id)}
		>
			<Text style={styles.goalText}>{text}</Text>
		</Pressable>
	</View>
);

export default GoalItem;

const styles = StyleSheet.create({
	goalItem: {
		margin: 8,
		borderRadius: 6,
		backgroundColor: '#5e0acc',
	},
	pressedItem: {
		opacity: 0.5,
	},
	goalText: {
		color: 'white',
		padding: 8,
	}
});