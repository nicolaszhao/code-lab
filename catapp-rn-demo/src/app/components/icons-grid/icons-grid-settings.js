import React, {
	Component,
	View,
	Text,
	TouchableOpacity,
	ListView,
	AsyncStorage
} from 'react-native';

import Checkbox from '../checkbox/Checkbox.js';
import styles from './icons-grid-settings.style.js';

class Settings extends Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			that = this;

		this.source = {};

		this.props.fullData.forEach(function(n) {
			that.source[n.id] = Object.assign({}, n);
		});

		this.state = {
			dataSource: ds.cloneWithRows(this._genRows(this.source))
		};
	}

	componentDidMount() {
		var that = this;

		this.props.selectedItems.forEach(function(id) {
			that.source[id].checked = true;
		});

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._genRows(that.source))
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.list}>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={this._renderRow.bind(this)}
						/>
				</View>
				<View style={styles.buttonpane}>
					<TouchableOpacity style={[styles.button]}
						onPress={this._done.bind(this)}>
						<Text style={styles.buttonText}>完成</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.buttonCancel]}
						onPress={this.props.cancel}>
						<Text style={styles.buttonText}>取消</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	_renderRow(rowData) {
		return (
			<View style={styles.item}>
				<Checkbox value={rowData.id} label={rowData.label} checked={rowData.checked} onPress={this._pressRow.bind(this, rowData.id)} />
			</View>
		);
	}

	_genRows(pressData) {
		var ret = [],
			item;

		for (var id in pressData) {
			item = pressData[id];
			ret.push(Object.assign({}, item, {
				checked: typeof item.checked === 'boolean' && item.checked
			}));
		}

		return ret;
	}

	_pressRow(rowId) {
		this.source[rowId].checked = !this.source[rowId].checked;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this._genRows(this.source))
		});
	}

	_done() {
		var ret = [],
			that = this;

		for (var id in this.source) {
			if (this.source[id].checked) {
				ret.push(id);
			}
		}

		AsyncStorage.setItem('icons-grid-selected', JSON.stringify(ret)).then(function() {
			that.props.done(ret);
		});
	}
}

export default Settings;