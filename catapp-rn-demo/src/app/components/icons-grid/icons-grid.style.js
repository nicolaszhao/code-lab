import { StyleSheet, Dimensions } from 'react-native';
var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	grid: {
		flex: 1
	},
	gridRow: {
		flexDirection: 'row'
	},
	gridItem: {

	},
	gridItemWrapper: {
		padding: 10,
		alignItems: 'center',
	},
	gridItemIconWrapper: {
		width: 48,
		height: 48,
		marginBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#c8c8c8',
		borderRadius: 12,
		backgroundColor: '#f1f1f1',
	},
	gridItemIcon: {
		width: 32,
		height: 32
	},
	gridItemLabel: {
		fontSize: 12,
		color: '#666'
	},
	gridAddIconWrapper: {
		borderWidth: 0,
		backgroundColor: 'transparent'
	},
	settings: {
		width: width,

		// 40 is the height of Header Component
		height: height - 40,

		position: 'absolute',
		top: 0,
		left: 0
	}
});

export default styles;