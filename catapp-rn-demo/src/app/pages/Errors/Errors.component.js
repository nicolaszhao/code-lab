import React, {
	Component,
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
	DatePickerIOS,
	DatePickerAndroid,
	TimePickerAndroid,
	Platform
} from 'react-native';

import Header from '../../components/Header.js';
import Loading from '../../components/Loading.js';
import SignIn from '../../pages/SignIn/SignIn.component.js';
import { alertTitles } from '../../config/textMaps.js';
import { ERRORS_REQUEST } from '../../config/requestUrls.js';
import fetch from '../../utils/fetch.js';
import userStorage from '../../utils/userStorage.js';
import type from '../../utils/type.js';
import { formatNumber, formatDate } from '../../utils/formatHelper.js';
import Grids from './Errors.grids.js';
import styles from './Errors.style.js';

var isAndroid = Platform.OS === 'android';

class Errors extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDate: new Date(),
			opening: false,
			pending: false,
			mode: 'date',
			dataSource: null,
			dataSize: -1
		};

		this.changingDate = null;
	}

	componentDidMount() {
		this._update();
	}

	render() {
		var headerButtons = {
			left: true
		};

		var dateText = formatDate(this.state.selectedDate).split(' ');

		return (
			<View style={styles.container}>
				<Header buttons={headerButtons} title="报错大盘" navigator={this.props.navigator} />
				<View style={styles.content}>
					<ScrollView>
						<View style={styles.controlsbar}>
							<TouchableOpacity style={[styles.groupButton, styles.groupButtonFirst]} onPress={this._changeDate.bind(this)}>
								<Text style={styles.groupButtonText}>{dateText[0]}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.groupButton} onPress={this._changeTime.bind(this)}>
								<Text style={styles.groupButtonText}>{dateText[1]}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.groupButton, styles.groupButtonLast, styles.groupButtonWithIcon]}
								onPress={this._update.bind(this, true)}>

								<Image style={styles.groupButtonIcon} source={require('../../images/refresh-black.png')} />
								<Text style={styles.groupButtonText}>刷新</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.mainContent}>
							{!this.state.dataSource ?
								<View style={styles.message}><Text style={styles.messageText}>{!this.state.dataSize ? '无数据' : '' }</Text></View> :
								<Grids
									date={this.state.selectedDate}
									dataSource={this.state.dataSource} />}
						</View>
					</ScrollView>
				</View>
				{this.state.opening ? this._renderDatePicker() : null}
				{this.state.pending ? <Loading /> : null}
			</View>
		);
	}

	_renderDatePicker() {
		return (
			<View style={styles.datepicker}>
				<View style={styles.datepickerButtonsbar}>
					<TouchableOpacity style={styles.datepickerButton} onPress={this._cancel.bind(this)}>
						<Text style={styles.datepickerButtonText}>取消</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.datepickerButton} onPress={this._ok.bind(this)}>
						<Text style={styles.datepickerButtonText}>完成</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.datepickerContent}>
					<DatePickerIOS
						maximumDate={new Date()}
						mode={this.state.mode}
						date={this.state.selectedDate}
						onDateChange={this._dateChangeHandler.bind(this)}
						/>
				</View>
			</View>
		);
	}

	_update(date, needMinutes) {
		if (typeof date === 'boolean') {
			needMinutes = date;
		}

		if (type(date) !== 'date') {
			date = new Date();
		}

		var that = this,
			dataSource = null,
			dateText = date.getFullYear() +
				formatNumber(date.getMonth() + 1) +
				formatNumber(date.getDate()) +
				formatNumber(date.getHours());

		that.setState({
			selectedDate: date
		});

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

				that.setState({
					pending: true
				});

				fetch(ERRORS_REQUEST, {
					params: {
						date: dateText,
						count: 6,
						tops: 10,
						env: userData.serverType,
						token: userData.token,
						minute: needMinutes ? date.getMinutes() : 0
					}
				})
					.then(function(res) {
						if (type(res) === 'object' && res.status == 3) {
							return that._relogin();
						}

						if (type(res) === 'array' && res.length) {
							dataSource = res;
						} else {
							Alert.alert(alertTitles.WARNING, '数据返回出现了小问题，请稍后重新尝试。');
							dataSource = null;
						}

						that.setState({
							pending: false,
							dataSource: dataSource,
							dataSize: dataSource ? dataSource.length : 0
						});
					});
			});
	}

	_ok() {
		this._update(this.changingDate, true);
	}

	_cancel() {
		this.setState({
			opening: false
		});
	}

	_dateChangeHandler(date) {
		this.changingDate = date;
	}

	_changeDate() {
		var that = this,
			selectedDate = this.state.selectedDate;

		this.setState({
			opening: !isAndroid,
			mode: 'date'
		});

		if (isAndroid) {
			DatePickerAndroid.open({
				date: selectedDate,
				maxDate: new Date()
			})
				.then(function(data) {
					var { action, year, month, day } = data;

					if (action !== DatePickerAndroid.dismissedAction) {
						selectedDate.setFullYear(year);
						selectedDate.setMonth(month);
						selectedDate.setDate(day);

						that._update(selectedDate, true);
					}
				})
				.catch(function(err) {
					Alert.alert(alertTitles.ERROR, err.message);
				});
		}
	}

	_changeTime() {
		var that = this,
			selectedDate = this.state.selectedDate;

		this.setState({
			opening: !isAndroid,
			mode: 'time'
		});

		if (isAndroid) {
			TimePickerAndroid.open({
				hour: selectedDate.getHours(),
				minute: selectedDate.getMinutes(),
				is24Hour: true
			})
				.then(function(data) {
					var { action, hour, minute } = data;

					if (action !== TimePickerAndroid.dismissedAction) {
						selectedDate.setHours(hour);
						selectedDate.setMinutes(minute);

						that._update(selectedDate, true);
					}
				})
				.catch(function(err) {
					Alert.alert(alertTitles.ERROR, err.message);
				});
		}
	}

	_relogin() {
		var that = this;

		userStorage.token('free').then(function() {
			that.props.navigator.immediatelyResetRouteStack([]);
			that.props.navigator.push({pathname: '/signin', component: SignIn});
		});
	}
}

export default Errors;