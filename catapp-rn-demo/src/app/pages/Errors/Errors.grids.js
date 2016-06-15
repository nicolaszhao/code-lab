import React, {
	Component,
	View,
	Text,
	Image,
	TouchableOpacity,
	Alert,
	StyleSheet,
	Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';
import userStorage from '../../utils/userStorage.js';
import { formatNumber, formatRate } from '../../utils/formatHelper.js';
import fetch from '../../utils/fetch.js';
import { ERRORS_REQUEST } from '../../config/requestUrls.js';

var {height, width} = Dimensions.get('window');

class Grids extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: this.props.dataSource,
			activeIndex: 0
		};
	}

	render() {
		return (
			<Swiper
				style={styles.container}
				loop={false}
				height={height - 120}
				showsPagination={false}>

				{this._renderGrids()}
			</Swiper>
		);
	}

	_renderGrids() {
		var dataSource = this.state.dataSource;

		return dataSource.map(function(item, i) {
			return (
				<View key={i}>
					{this._renderGrid(item)}
				</View>
			);
		}.bind(this));
	}

	_renderGrid(data) {
		return (
			<View style={styles.grid}>
				<View style={styles.gridCaption}><Text style={styles.gridCaptionText}>{data.minute}</Text></View>
				<View style={styles.gridHeader}>
					<View style={[styles.gridHeaderCell, styles.gridCellFirst]}>
						<Text style={styles.gridHeaderText}>App ID</Text>
					</View>
					<View style={styles.gridHeaderCell}>
						<Text style={styles.gridHeaderText}>错误数</Text>
					</View>
					<View style={[styles.gridHeaderCell]}>
						<Text style={styles.gridHeaderText}>环比</Text>
					</View>
				</View>
				{this._renderRows(data.domains)}
			</View>
		);
	}

	_renderRows(data) {
		return data.map(function(row) {
			return (
				<View style={[styles.gridRow]} key={row.appId}>
					<View style={[styles.gridCell, styles.gridCellFirst]}>
						<TouchableOpacity style={styles.gridLink}>
							<Text style={[styles.gridCellText,
								styles.gridLinkText,
								row.alert === 2 && styles.gridErrorRowText,
								row.alert === 1 && styles.gridWarningRowText]}>{row.appId}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.gridCell}>
						<TouchableOpacity style={styles.gridLink}>
							<Text style={[styles.gridCellText,
								styles.gridLinkText,
								row.alert === 2 && styles.gridErrorRowText,
								row.alert === 1 && styles.gridWarningRowText]}>{row.total}</Text>
						</TouchableOpacity>
					</View>
					<View style={[styles.gridCell]}>
						<Text style={[styles.gridCellText,
							row.alert === 2 && styles.gridErrorRowText,
							row.alert === 1 && styles.gridWarningRowText]}>{formatRate(row.sequential)}</Text>
					</View>
				</View>
			);
		}.bind(this));
	}

	_load(date, count) {
		var that = this,
			dateText = date.getFullYear() +
				formatNumber(date.getMonth() + 1) +
				formatNumber(date.getDate()) +
				formatNumber(date.getHours());

		return new Promise(function(resolve) {
			userStorage.token()
				.then(function(token) {
					return userStorage.getItem('server-type').then(function(serverType) {
						return {
							token: token,
							serverType: serverType || 'fat'
						};
					});
				})
				.then(function(userData) {
					fetch(ERRORS_REQUEST, {
						params: {
							date: dateText,
							count: count,
							tops: 10,
							env: userData.serverType,
							token: userData.token,
							minute: date.getMinutes()
						}
					})
						.then(function(res) {
							if (type(res) === 'array' && res.length) {
								resolve(res);
							}
						});
				});
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	grid: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15
	},
	gridCaption: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#f1f1f1',
		borderBottomWidth: 1
	},
	gridCaptionText: {
		fontSize: 14,
		color: '#999'
	},
	gridHeader: {
		flexDirection: 'row',
		borderColor: '#656565',
		borderBottomWidth: 2
	},
	gridHeaderCell: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 8,
		paddingBottom: 10,
		paddingLeft: 8,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	gridHeaderText: {
		fontSize: 14,
		color: '#333'
	},
	gridRow: {
		flexDirection: 'row',
		borderColor: '#ccc',
		borderBottomWidth: 1
	},
	gridCell: {
		flex: 1,
		paddingTop: 6,
		paddingRight: 8,
		paddingBottom: 6,
		paddingLeft: 8,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	gridCellFirst: {
		flex: 0.7,
		alignItems: 'flex-start'
	},
	gridCellText: {
		fontSize: 12,
		color: '#555'
	},
	gridLink: {

	},
	gridLinkText: {
		color: '#0087FF'
	},
	gridErrorRowText: {
		color: '#CC0000'
	},
	gridWarningRowText: {
		color: '#FFB300'
	}
});

export default Grids;