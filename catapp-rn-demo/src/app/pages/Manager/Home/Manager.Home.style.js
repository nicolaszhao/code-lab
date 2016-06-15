import { StyleSheet } from 'react-native';
import baseStyles from '../../../styles/baseStyles';

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}),
	content: {
		flex: 1
	},
	items: {
		paddingTop: 15
	},
	item: {
		height: 40,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#fff'
	},
	itemFirst: {
		borderTopWidth: 1
	},
	itemTextWrapper: {
		flex: 1,
		paddingLeft: 20,
		justifyContent: 'center'
	},
	itemIconWrapper: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	itemText: {
		fontSize: 14
	},
	itemIcon: {
		width: 14,
		height: 14
	}
});

export default styles;