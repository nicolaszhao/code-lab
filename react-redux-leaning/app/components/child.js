import React, {
	Component
} from 'react';

class Child extends Component {
	render() {
		return (
			<div>
				<h3>Change Value</h3>
				<p>
					<label>to: </label>
					<input type="text" ref="input" /><button onClick={this.submit.bind(this)}>Ok</button>
				</p>

			</div>
		);
	}

	submit() {
		this.props.onChange(this.refs.input.value);
	}
}

export default Child;