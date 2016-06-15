import { StyleSheet } from 'react-native';
import baseStyles from '../../styles/baseStyles';

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}),
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default styles;