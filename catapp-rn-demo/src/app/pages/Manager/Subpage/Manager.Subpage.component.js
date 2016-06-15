import React, {
	Component,
	View,
	Text,
	Image,
	ListView,
	Alert
} from 'react-native';

import Header from '../../../components/Header.js';
import Loading from '../../../components/Loading.js';
import Radiobox from '../../../components/Radiobox.js';
import SignIn from '../../SignIn/SignIn.component.js';
import fetch from '../../../utils/fetch.js';
import userStorage from '../../../utils/userStorage.js';
import type from '../../../utils/type.js';
import { alertTitles, errorMessages } from '../../../config/textMaps.js';
import styles from './Manager.Subpage.style.js';

class ManagerSubpage extends Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.source = null;

		this.state = {
			pending: false,
			dataSource: ds.cloneWithRows([]),
			dataSize: -1
		};
	}

	componentDidMount() {
		var that = this;

		this.setState({
			pending: true
		});

		userStorage.token()
			.then(function(token) {
				fetch(that.props.requestPullUrl, {
					params: {
						token: token
					}
				})
					.then(function(data) {
						if (data.status == 1) {
							if (type(data.userList) === 'array' && data.userList.length) {
								if (that.props.adjustData) {
									that.source = that.props.adjustData(data.userList);
								} else {
									that.source = data.userList.map(function(item, i) {
										item.index = i;
										return item;
									});
								}

								that.setState({
									dataSize: that.source.length,
									dataSource: that.state.dataSource.cloneWithRows(that.source)
								});
							} else {
								that.setState({
									dataSize: 0
								});
							}
						} else if (data.status == 3) {
							return that._relogin();
						} else {
							that.setState({
								dataSize: 0
							});
						}

						that.setState({
							pending: false
						});
					})
					.catch(function(err) {
						Alert.alert(alertTitles.ERROR, err.message);

						that.setState({
							pending: false
						});
					});
			});
	}

	render() {
		var buttons = {
			left: true,
			right: {
				handle: this._submit.bind(this),
				icon: require('../../../images/check-black.png')
			}
		};

		return (
			<View style={styles.container}>
				<Header buttons={buttons} title={this.props.title} navigator={this.props.navigator} />
				{!this.state.dataSize ?
					<View style={styles.message}><Text style={styles.messageText}>无数据</Text></View> :
					<ListView
						style={styles.content}
						dataSource={this.state.dataSource}
						renderRow={this._renderRow.bind(this)}
						/>}

				{this.state.pending ? <Loading /> : null}
			</View>
		);
	}

	_renderRow(rowData) {
		var selectedIndex = rowData.pass == 1 ? 0 : (rowData.pass == 3 ? 1 : -1),

			icon = rowData.pass == 1 ?
			require('../../../images/icon-checked.png') :
			(rowData.pass == 3 ?
				require('../../../images/icon-close.png') :
				require('../../../images/icon-warning.png'));

		return (
			<View style={styles.item}>
				<Image style={styles.icon} source={icon} />
				<View style={styles.info}>
					<View style={styles.infoItem}>
						<Text style={styles.name}>{rowData.userFullName}</Text>
					</View>
					<View style={styles.infoItem}>
						<Text style={styles.infoText}>
							用户名: {rowData.userName} | 部门: {rowData.department}
						</Text>
					</View>
				</View>
				<Radiobox style={styles.radiobox} values={['通过', '拒绝']} selectedIndex={selectedIndex} onValueChange={this._approve.bind(this, rowData)} />
			</View>
		);
	}

	_genRowsData(oriData) {
		return oriData.map(function(item) {
			return Object.assign({}, item);
		});
	}

	_approve(rowData, value) {
		var isPassed = value === '通过';

		this.source = this._genRowsData(this.source);
		this.source[rowData.index].pass = isPassed ? 1 : 3;

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.source)
		});
	}

	_relogin() {
		var that = this;

		userStorage.token('free').then(function() {
			that.props.navigator.immediatelyResetRouteStack([]);
			that.props.navigator.push({pathname: '/signin', component: SignIn});
		});
	}

	_submit() {
		var that = this,
			approvedData = this.props.genApprovedData(this.source);

		if (!approvedData) {
			return this.props.navigator.pop();
		}

		this.setState({
			pending: true
		});

		userStorage.token()
			.then(function(token) {
				fetch(that.props.requestPushUrl, {
					params: {
						token: token
					},
					headers: {
						'Content-Type': 'application/json'
					},
					data: JSON.stringify(approvedData)
				})
					.then(function(data) {
						if (data.status == 1) {
							that.props.navigator.pop();
						} else if (data.status == 3) {
							return that._relogin();
						} else {
							Alert.alert(alertTitles.ERROR, errorMessages.REQUEST_FAILED);
						}

						that.setState({
							pending: false
						});
					})
					.catch(function(err) {
						Alert.alert(alertTitles.ERROR, err.message);

						that.setState({
							pending: false
						});
					});
			});
	}
}

export default ManagerSubpage;