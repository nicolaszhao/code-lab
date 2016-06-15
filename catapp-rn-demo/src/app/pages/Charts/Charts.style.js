import { StyleSheet, Dimensions } from 'react-native';
import baseStyles from '../../styles/baseStyles';

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: Object.assign({}, baseStyles.container, {
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}),
	content: {

	},
	banner: {
		height: 160,
		marginTop: 15,
		marginBottom: 15,
		alignItems: 'center',
		textAlign: 'center',
		backgroundColor: '#fff',
	},
	bannerImg: {
		height: 160,
		resizeMode: 'contain'
	},
	chartList: {

	},
	chartRow: {
		flexDirection: 'row'
	},
	chartItem: {
		width: width / 4
	},
	chartItemWrapper: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		alignItems: 'center',
		textAlign: 'center'
	},
	chartItemIconWrapper: {
		width: 48,
		height: 48,
		marginBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#c8c8c8',
		borderRadius: 10,
		backgroundColor: '#dfdfdf'
	},
	chartItemIcon: {
		width: 32,
		height: 32
	},
	chartItemText: {
		fontSize: 12,
		color: '#666'
	},
	addItemIconWrapper: {
		borderWidth: 0,
		backgroundColor: 'transparent'
	},
	addItemText: {
		color: '#999'
	}
});

export default styles;