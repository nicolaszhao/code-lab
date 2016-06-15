import React, { Component, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Button extends Component {
	render() {
		var textType = this.props.iconNoText ?
			this.props.children :
			<Text style={styles.buttonText}>{this.props.children}</Text>;

		return (
			<TouchableOpacity
				style={[styles.button, this.props.style]}
				onPress={this.props.handlePress}>
				{textType}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 8,
		paddingBottom: 8,
		borderRadius: 5,
		backgroundColor: '#333'
	},
	buttonText: {
		fontSize: 14,
		color: '#fff'
	}
});

export default Button;