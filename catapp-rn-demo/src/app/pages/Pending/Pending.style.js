import { StyleSheet } from 'react-native';
import baseStyles from '../../styles/baseStyles';

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		alignItems: 'stretch'
	}),
	message: {
		marginBottom: 25,
		fontSize: 18,
		textAlign: 'center',
		color: '#000'
	},
	buttonWrapper: {
		marginLeft: 30,
		marginRight: 30,
		marginBottom: 15
	}
});

export default styles;