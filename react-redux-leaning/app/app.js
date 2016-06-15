import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeValue, setInputVisibility } from './actions.js';
import Parent from './components/parent.js';

var select = function(state) {
	return {
		value: state.value,
		inputVisibility: state.inputVisibility
	};
};

class App extends Component {
	render() {
		const { dispatch, value, inputVisibility } = this.props;

		return <Parent
			value={value}
			inputVisible={inputVisibility}
			onInputChange={(value) => {dispatch(changeValue(value))}}
			onButtonClick={(inputVisible) => {dispatch(setInputVisibility(inputVisible))}} />
	}
}

export default connect(select)(App);