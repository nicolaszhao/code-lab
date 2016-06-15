import React, {
	Component,
	View,
	Text,
	ListView
} from 'react-native';

import Header from '../../components/Header';
import Checkbox from '../../components/checkbox/Checkbox';
import storage from '../../utils/userStorage.js';
import { chartLabels } from '../../config/textMaps.js';
import styles from './Settings.style';

class Settings extends Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var that = this;

		this.source = {};

		chartLabels.forEach(function(n) {
			that.source[n.id] = n;
		});

		this.state = {
			dataSource: ds.cloneWithRows(this._genRows(this.source))
		};
	}

	componentDidMount() {
		var that = this;

		storage.getItem('charts-selected')
			.then(function(data) {
				if (!data) {
					return;
				}

				data.forEach(function(item) {
					that.source[item].checked = true;
				});

				that.setState({
					dataSource: that.state.dataSource.cloneWithRows(that._genRows(that.source))
				});
			});
	}

	render() {
		var buttons = {
			left: true,
			right: {
				handle: this._submit.bind(this),
				icon: require('../../images/check-black.png')
			}
		};

		return (
			<View style={styles.container}>
				<Header buttons={buttons} title="增加报表" navigator={this.props.navigator} />
				<ListView
					dataSource={this.state.dataSource}
				    renderRow={this._renderRow.bind(this)}
					/>
			</View>
		);
	}

	_renderRow(rowData) {
		return (
			<View style={styles.chartItem}>
				<Checkbox value={rowData.id} label={rowData.label} checked={rowData.checked} onPress={this._pressRow.bind(this, rowData.id)} />
			</View>
		);
	}

	_genRows(pressData) {
		var ret = [],
			chart;

		for (var id in pressData) {
			chart = pressData[id];
			ret.push(Object.assign({}, chart, {
				checked: typeof chart.checked === 'boolean' ? chart.checked : false
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

	_submit() {
		var ret = [],
			that = this;

		for (var id in this.source) {
			if (this.source[id].checked) {
				ret.push(id);
			}
		}

		storage.setItem('charts-selected', ret).then(function() {
			that.props.setCharts();
			that.props.navigator.pop()
		});
	}
}

export default Settings;