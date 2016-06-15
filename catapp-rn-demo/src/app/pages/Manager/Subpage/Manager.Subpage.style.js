import { StyleSheet } from 'react-native';
import baseStyle from '../../../styles/baseStyles.js';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: baseStyle.container.backgroundColor
	},
	content: {
		paddingTop: 15
	},
	message: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	messageText: {
		fontSize: 20
	},
	item: {
		height: 60,
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: -1,
		flexDirection: 'row',
		alignItems: 'center',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#fff'
	},
	icon: {
		width: 16,
		height: 16
	},
	info: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10
	},
	infoItem: {
		flex: 1,
		justifyContent: 'center'
	},
	infoText: {
		fontSize: 12,
		color: '#666'
	},
	name: {
		fontSize: 18,
		color: '#333'
	},
	radiobox: {
		width: 80
	}
});

export default styles;