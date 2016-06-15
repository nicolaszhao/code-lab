import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	list: {
		flex: 1
	},
	item: {
		marginTop: -1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ddd'
	},
	buttonpane: {
		height: 90,
		borderTopWidth: 1,
		borderColor: '#eee'
	},
	button: {
		height: 30,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#333'
	},
	buttonText: {
		fontSize: 12,
		color: '#fff'
	},
	buttonCancel: {
		marginTop: 0,
		backgroundColor: '#c00'
	}
});

export default styles;