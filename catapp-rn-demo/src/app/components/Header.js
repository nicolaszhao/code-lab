import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

import Button from './Button';

class Header extends Component {
	render() {
		var buttons = this.props.buttons || {},
			LeftButton = buttons.left ?
				<Button style={styles.button} handlePress={this.leftButtonHandle.bind(this)} iconNoText={true}>
					<Image style={styles.buttonIcon} source={require('../images/carat-l-black.png')} />
				</Button> :
				null,

			RightButton = buttons.right ?
				<Button style={styles.button} handlePress={buttons.right.handle} iconNoText={true}>
					<Image style={styles.buttonIcon} source={buttons.right.icon} />
				</Button> :
				null;

		return (
			<View style={styles.container}>
				<View style={styles.buttonWrapper}>
					{LeftButton}
				</View>
				<View style={styles.title}>
					<Text style={styles.titleText}>{this.props.title}</Text>
				</View>
				<View style={styles.buttonWrapper}>
					{RightButton}
				</View>
			</View>
		);
	}

	leftButtonHandle() {
		this.props.navigator.pop();
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 40,
		borderStyle: 'solid',
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 1,
		borderLeftWidth: 0,
		borderColor: '#ddd',
		backgroundColor: '#e9e9e9'
	},
	buttonWrapper: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: 28,
		height: 28,
		padding: 0,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 14,
		backgroundColor: '#f6f6f6',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonIcon: {
		width: 14,
		height: 14
	},
	title: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		fontSize: 14,
		color: '#333'
	}
});

export default Header;