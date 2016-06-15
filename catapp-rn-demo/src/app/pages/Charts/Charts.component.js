import React, { Component, View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Settings from '../Settings/Settings.component';
import Errors from '../Errors/Errors.component.js';
import IconsGridDemo from '../icons-grid-demo/icons-grid-demo.component.js';
import { chartLabels } from '../../config/textMaps.js';
import storage from '../../utils/userStorage.js';
import styles from './Charts.style.js';

var chartList = [
	{
		icon: require('../../images/icon-dashboard.png'),
		path: '/errors',
		component:Errors
	},
	{
		icon: require('../../images/icon-business.png'),
		path: '/icons-grid-demo',
		component: IconsGridDemo
	},
	{
		icon: require('../../images/icon-api.png'),
		path: ''
	},
	{
		icon: require('../../images/icon-pv.png'),
		path: ''
	},
	{
		icon: require('../../images/icon-statistics.png'),
		path: ''
	},
	{
		icon: require('../../images/icon-fitness.png'),
		path: ''
	},
	{
		icon: require('../../images/icon-transaction.png'),
		path: ''
	},
	{
		icon: require('../../images/icon-event.png'),
		path: ''
	}
];

class Charts extends Component {
	constructor(props) {
		super(props);

		this.source = {};
		var that = this;

		chartLabels.forEach(function(n, i) {
			that.source[n.id] = Object.assign({}, n, chartList[i]);
		});

		this.state = {
			chartList: [],
			addButtonInNewRow: false
		};
	}

	componentDidMount() {
		this._genChartList();
	}

	render() {
		var chartList = this.state.chartList.map(function(chart, i) {
			return (
				<TouchableOpacity key={chart.id} style={styles.chartItem} onPress={this.openChartPage.bind(this, chart.path, chart.component)}>
					<View style={styles.chartItemWrapper}>
						<View style={styles.chartItemIconWrapper}>
							<Image style={styles.chartItemIcon} source={chart.icon} />
						</View>
						<Text style={styles.chartItemText}>{chart.label}</Text>
					</View>
				</TouchableOpacity>
			)
		}.bind(this));

		return (
			<View style={styles.container}>
				<Header title="报表" />
				<View style={styles.content}>
					<View style={styles.banner}>
						<Image style={styles.bannerImg} source={require('../../images/banner.jpg')} />
					</View>
					<View style={styles.chartList}>
						{this._renderChartGrid()}
						{this.state.addButtonInNewRow ? this._addButton() : null}
					</View>
				</View>
			</View>
		);
	}

	openChartPage(path, component) {
		if (path && component) {
			this.props.navigator.push({pathname: path, component: component});
		}
	}

	openSettingsPage() {
		this.props.navigator.push({pathname: '/charts/settings', component: Settings, params: {
			setCharts: function() {
				this._genChartList();
			}.bind(this)
		}});
	}

	_genChartList() {
		var that = this,
			charts = [];

		storage.getItem('charts-selected').then(function(data) {
			if (!data) {
				return;
			}

			data.forEach(function(id) {
				charts.push(that.source[id]);
			});

			that.setState({
				chartList: charts
			});
		});
	}

	_addButton() {
		return (
			<TouchableOpacity style={styles.chartItem} onPress={this.openSettingsPage.bind(this)}>
				<View style={styles.chartItemWrapper}>
					<View style={[styles.chartItemIconWrapper, styles.addItemIconWrapper]}>
						<Image style={styles.chartItemIcon} source={require('../../images/icon-add.png')} />
					</View>
					<Text style={[styles.chartItemText, styles.addItemText]}>更多</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_renderChartGrid() {
		var grid = [],
			that = this,

			renderCell = function(row) {
				return row.map(function(chart) {
					return (
						<TouchableOpacity key={chart.id} style={styles.chartItem} onPress={that.openChartPage.bind(that, chart.path, chart.component)}>
							<View style={styles.chartItemWrapper}>
								<View style={styles.chartItemIconWrapper}>
									<Image resizeMode="stretch" style={styles.chartItemIcon} source={chart.icon} />
								</View>
								<Text style={styles.chartItemText}>{chart.label}</Text>
							</View>
						</TouchableOpacity>
					);
				});
			},

			renderCellWidthAdd = function(row, i) {
				var items = renderCell(row);

				if (i === grid.length - 1 && items.length < 4) {
					that.state.addButtonInNewRow = false;
					items.push(that._addButton());
				}

				return items;
			};

		that.state.addButtonInNewRow = true;

		this.state.chartList.forEach(function(chart, i) {
			var rowIndex = Math.floor(i / 4);

			if (i % 4 === 0) {
				grid[rowIndex] = [];
			}
			grid[rowIndex].push(chart);
		});

		return grid.map(function(row, i) {
			return (
				<View style={styles.chartRow}>
					{renderCellWidthAdd(row, i)}
				</View>
			);
		});
	}
}

export default Charts;