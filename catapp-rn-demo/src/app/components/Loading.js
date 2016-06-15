import React, { Component, StyleSheet, View, Text } from 'react-native';

const loadingText = '玩命加载中';

class Loading extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: loadingText + '...'
		};
	}

	componentDidMount() {
		//this._loading();
	}

	componentWillUnmount() {
		clearTimeout(this._loadingTimer);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>{this.state.text}</Text>
			</View>
		);
	}

	_loading() {
		this._loadingTimer = setTimeout(() => {
			var text = this.state.text;

			text = text.length < 6 ? text + '.' : loadingText;
			this.setState({text: text});

			this._loading();
		}, 500);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(255,255,255,0.7)'
	},
	loadingText: {
		fontSize: 14,
		color: '#333'
	}
});

export default Loading;