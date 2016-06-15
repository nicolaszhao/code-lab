import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class Checkbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.checked
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({checked: nextProps.checked});
	}

	render() {
		var checked = this.state.checked;

		return (
			<TouchableOpacity style={styles.container} onPress={this.handlePress.bind(this)} value={this.props.value}>
				<View style={[styles.iconWrapper, checked && styles.iconChecked]}>
					{checked && <Image style={styles.icon} source={require('./images/check-white.png')} />}
				</View>
				<Text style={styles.label}>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}

	handlePress() {
		this.setState({checked: !this.state.checked});

		if (this.props.onPress) {
			this.props.onPress();
		}
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 15,
		paddingBottom: 15
	},
	iconWrapper: {
		width: 18,
		height: 18,
		marginLeft: 12,
		marginRight: 18,
		backgroundColor: '#ccc',
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	iconChecked: {
		backgroundColor: '#38c'
	},
	icon: {
		width: 14,
		height: 14
	},
	label: {
		fontSize: 12,
		color: '#333'
	}
});

export default Checkbox;