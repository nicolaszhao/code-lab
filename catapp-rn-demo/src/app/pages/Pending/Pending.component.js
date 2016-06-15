import React, {
	View,
	Text,
	Component,
	TouchableOpacity,
	Alert
} from 'react-native';

import Loading from '../../components/Loading';
import Button from '../../components/Button';
import SignIn from '../SignIn/SignIn.component.js';
import fetch from '../../utils/fetch';
import { RELOGIN_REQUEST } from '../../config/requestUrls';
import { alertTitles, errorMessages } from '../../config/textMaps.js';
import styles from './Pending.style';

export default class Pending extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pending: false
		};
	}

	render() {
		var ReapplyButton = this.props.state === 'refused' ?
			<View style={styles.buttonWrapper}>
				<Button handlePress={this.reapply.bind(this)}>重新申请权限</Button>
			</View> :
			null;

		var LoadingComponent = this.state.pending ? <Loading /> : null;

		return (
			<View style={styles.container}>
				<Text style={styles.message}>{this.props.message}</Text>
				{ReapplyButton}
				<View style={styles.buttonWrapper}>
					<Button handlePress={this.relogin.bind(this)}>重新登录</Button>
				</View>
				{LoadingComponent}
			</View>
		);
	}

	reapply() {
		var that = this;

		this.setState({pending: true});

		fetch(RELOGIN_REQUEST, {
			params: {
				name: this.props.username
			},
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function(data) {
				if (data.status === '1') {
					Alert.alert(alertTitles.WARNING, '申请已提交，请等待审核');
				} else {
					Alert.alert(alertTitles.ERROR, errorMessages.REQUEST_FAILED);
				}

				that.setState({pending: false});
			})
			.catch(function(err) {
				Alert.alert(alertTitles.ERROR, err.message);
				that.setState({pending: false});
			});

	}

	relogin() {
		this.props.navigator.immediatelyResetRouteStack([]);
		this.props.navigator.push({pathname: '/signin', component: SignIn});
	}
}
