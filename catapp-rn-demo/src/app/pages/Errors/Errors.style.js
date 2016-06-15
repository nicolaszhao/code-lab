import { StyleSheet } from 'react-native';
import baseStyle from '../../styles/baseStyles.js';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: baseStyle.container.backgroundColor
	},
	content: {
		flex: 1
	},
	controlsbar: {
		height: 50,
		marginTop: 15,
		marginBottom: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	groupButton: {
		height: 26,
		paddingLeft: 8,
		paddingRight: 8,
		justifyContent: 'center',
		borderWidth: 1,
		marginLeft: -1,
		borderColor: '#333',
		backgroundColor: '#fff',
	},
	groupButtonFirst: {
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4
	},
	groupButtonLast: {
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
	},
	groupButtonWithIcon: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	groupButtonText: {
		fontSize: 12,
		color: '#333'
	},
	groupButtonIcon: {
		width: 12,
		height: 12,
		marginRight: 5
	},
	mainContent: {
		flex: 1,
		backgroundColor: '#fff'
	},
	datepicker: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	},
	datepickerButtonsbar: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderColor: '#ccc',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		backgroundColor: '#E6E6E6'
	},
	datepickerButton: {
		height: 26,
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#333',
		borderRadius: 4,
		backgroundColor: '#fff',
	},
	datepickerButtonText: {
		fontSize: 12,
		color: '#333'
	},
	datepickerContent: {
		backgroundColor: '#fff',
		height: 200
	},
	message: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	messageText: {
		fontSize: 20
	}
});

export default styles;