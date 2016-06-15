import { StyleSheet } from 'react-native';
import baseStyles from '../../styles/baseStyles';

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}),
	wrapper: {
		marginLeft: 30,
		marginRight: 30,
		borderRadius: 5
	},
	logoWrapper: {
		height: 150,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 64,
		height: 64
	},
	title: {
		marginBottom: 25,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000'
	},
	inputWrapper: {
		marginBottom: 15,
		paddingTop: 4,
		paddingRight: 8,
		paddingBottom: 4,
		paddingLeft: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#ccc',
		backgroundColor: '#fff'
	},
	input: {
		height: 30,
		padding: 0,
		fontSize: 14,
		borderWidth: 0,
		backgroundColor: '#fff'
	}
});

export default styles;