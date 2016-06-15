import React, {
	Component,
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

class Radiobox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: typeof this.props.selectedIndex === 'number' ? this.props.selectedIndex : -1
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({selectedIndex: nextProps.selectedIndex});
	}

	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this._renderItems()}
			</View>
		);
	}

	_renderItems() {
		var len = this.props.values.length;

		return this.props.values.map(function(value, i) {
			var buttonStyle = [styles.button];

			if (i === 0) {
				buttonStyle.push(styles.firstButton);
			}

			if (i === len - 1) {
				buttonStyle.push(styles.lastButton);
			}

			if (this.state.selectedIndex === i) {
				buttonStyle.push(styles.activeButton);
			}

			return (
				<TouchableOpacity key={i} onPress={this._select.bind(this, i)} style={buttonStyle}>
					<Text style={[styles.buttonText, this.state.selectedIndex === i && styles.activeButtonText]}>{value}</Text>
				</TouchableOpacity>
			);
		}.bind(this));
	}

	_select(index) {
		this.setState({
			selectedIndex: index
		});

		if (this.props.onValueChange) {
			this.props.onValueChange(this.props.values[index]);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		borderWidth: 1,
		marginLeft: -1,
		borderColor: '#333',
		backgroundColor: '#fff',
	},
	firstButton: {
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4
	},
	lastButton: {
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
	},
	buttonText: {
		fontSize: 12,
		color: '#333'
	},
	activeButton: {
		backgroundColor: '#333'
	},
	activeButtonText: {
		color: '#fff'
	}
});

export default Radiobox;
