import React, {
	Component,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert
} from 'react-native';

import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Home from '../Home/Home.component.js';
import Pending from '../Pending/Pending.component';
import { LOGIN_REQUEST } from '../../config/requestUrls';
import { alertTitles } from '../../config/textMaps.js';
import fetch from '../../utils/fetch';
import storage from '../../utils/userStorage.js';
import styles from './SignIn.style';

const errorMessages = {
	USERNAME_REQUIRED: '请输入用户名',
	PASSWORD_REQUIRED: '请输入密码',
	ERROR: '用户名或密码错误'
};

export default class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pending: false,
			username: '',
			password: '',
		};
	}

	render() {
		var LoadingComponent = this.state.pending ? <Loading /> : null

		return (
			<View style={styles.container}>
				<View style={styles.logoWrapper}>
					<Image style={styles.logo} source={require('../../images/logo.png')} />
				</View>
				<Text style={styles.title}>CAT 客户端</Text>
				<View style={[styles.wrapper, styles.inputWrapper]}>
					<TextInput
						style={styles.input}
						ref="username"
						placeholder="用户名/邮箱"
						onChangeText={(username) => this.setState({username})}
						onSubmitEditing={(event) => {
							this.refs.password.focus();
						}} />
				</View>
				<View style={[styles.wrapper, styles.inputWrapper]}>
					<TextInput
						style={styles.input}
						ref="password"
						placeholder="密码"
						secureTextEntry={true}
						onChangeText={(password) => this.setState({password})}
						onSubmitEditing={this.submit.bind(this)} />
				</View>
				<View style={styles.wrapper}>
					<Button handlePress={this.submit.bind(this)}>登录</Button>
				</View>
				{LoadingComponent}
			</View>
		);
	}

	validate(fields) {
		var ret = true;

		for (var key in fields) {
			if (fields[key] === '') {
				Alert.alert(
					alertTitles.WARNING,
					errorMessages[key.toUpperCase() + '_REQUIRED'],
					[
						{
							text: '确定',
							onPress: () => { this.refs[key].focus(); }
						}
					]
				);
				ret = false;
				break;
			}
		}

		return ret;
	}

	submit() {
		var { username, password } = this.state,
			that = this;

		if (!this.validate({username, password})) {
			return;
		}

		this.setState({pending: true});

		fetch(LOGIN_REQUEST, {
			params: {
				userid: username,
				pwd: password,
				clientid: ''
			}
		})
			.then(function(data) {
				that.setState({pending: false});

				if (data.status === '1') {
					Object.assign(data, {
						userid: username
					});

					that.storeUserId(data).then(function() {
						that.props.navigator.push({pathname: '/home', component: Home});
					});
				} else if (data.status === '2' || data.status === '6') {
					that.props.navigator.push({pathname: '/pending', component: Pending, params: {
						message: data.message,
						state: data.status === '6' ? 'refused' : 'pending',
						username: username
					}});
				} else {
					Alert.alert(alertTitles.ERROR, errorMessages.ERROR);
				}
			})
			.catch(function(err) {
				that.setState({pending: false});
				Alert.alert(alertTitles.ERROR, err.message);
			});
	}

	storeUserId(data) {
		return storage.sign(data.userid)
			.then(function() {
				return storage.token(data.token).then(function() {
					return storage.setItem('user-role', data.role === 'A' ? 'admin' : 'other');
				});
			})
			.catch(function(err) {
				Alert.alert(alertTitles.ERROR, err.message);
			});
	}
}