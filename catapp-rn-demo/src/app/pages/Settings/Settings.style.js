import { StyleSheet } from 'react-native';
import baseStyles from '../../styles/baseStyles';

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}),
	chartItem: {
		backgroundColor: '#f6f6f6',
		borderStyle: 'solid',
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 1,
		borderLeftWidth: 0,
		borderColor: '#ddd'
	}
});

export default styles;