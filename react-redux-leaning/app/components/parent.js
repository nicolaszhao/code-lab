import React, { Component } from 'react';
import Child from './child.js';

class Parent extends Component {
	render() {
		return (
			<div>
				<p>
					<label>Value:</label> {this.props.value}
				</p>
				{this.props.inputVisible && <Child value={this.props.value} onChange={this._inputChangeHandler.bind(this)} />}
				<button onClick={this._buttonClickHandler.bind(this)}>Change</button>
			</div>
		);
	}

	_inputChangeHandler(value) {
		this.props.onInputChange(value);
		this.props.onButtonClick(false);
	}

	_buttonClickHandler() {
		this.props.onButtonClick(true);
	}
}

export default Parent;