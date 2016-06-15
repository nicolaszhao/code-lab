import { StyleSheet } from 'react-native';
import baseStyles from '../../styles/baseStyles';

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}),
	content: {
		flex: 1
	},
	userContent: {
		paddingTop: 20
	},
	userTop: {
		height: 150,
		marginBottom: 15,
		backgroundColor: '#EAEAEA',
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		width: 80,
		height: 80
	},
	username: {
		fontSize: 18,
		color: '#333'
	},
	userRowsGroup: {
		marginBottom: 15
	},
	userInfoRow: {
		flexDirection: 'row',
		marginTop: -1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ddd',
		backgroundColor: '#fff'
	},
	userLabel: {
		width: 160,
		height: 40,
		paddingRight: 40,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	userLabelText: {
		fontSize: 14,
		color: '#333'
	},
	userValue: {
		flex: 1,
		height: 40,
		justifyContent: 'center',
	},
	userValueText: {
		fontSize: 14,
		color: '#999'
	},
	userButtonsRow: {
		paddingRight: 20,
		paddingLeft: 20
	}
});

export default styles;