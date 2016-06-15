import React, {
	Component,
	View,
	Text,
	Image,
	ScrollView
} from 'react-native';

import Header from '../../components/Header.js';
import Button from '../../components/Button.js';
import Loading from '../../components/Loading.js';
import SignIn from '../SignIn/SignIn.component.js';
import { PROFILE_REQUEST } from '../../config/requestUrls.js';
import { alertTitles } from '../../config/textMaps.js';
import userStorage from '../../utils/userStorage.js';
import fetch from '../../utils/fetch.js';
import styles from './User.style.js';

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pending: false,
			username: '',
			fullname: '',
			department: ''
		};
	}

	componentDidMount() {
		var that = this;

		this.setState({
			pending: true
		});

		userStorage.token().then(function(token) {
			fetch(PROFILE_REQUEST, {
				params: {
					token: token
				}
			})
				.then(function(data) {
					if (data.status == 1) {
						that.setState({
							pending: false,
							username: data.name,
							fullname: data.fullname,
							department: data.department
						});
					} else if (data.status == 3) {
						that.setState({
							pending: false
						});

						that._signout();
					}
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
		return (
			<View style={styles.container}>
				<Header title="我的" />
				<View style={styles.content}>
					<ScrollView style={styles.userContent}>
						<View style={styles.userTop}>
							<Image style={styles.avatar} source={require('../../images/avatar.png')} />
							<Text style={styles.username}>{this.state.username}</Text>
						</View>
						<View style={styles.userRowsGroup}>
							<View style={styles.userInfoRow}>
								<View style={styles.userLabel}>
									<Text style={styles.userLabelText}>姓名:</Text>
								</View>
								<View style={styles.userValue}>
									<Text style={styles.userValueText}>{this.state.fullname}</Text>
								</View>
							</View>
							<View style={styles.userInfoRow}>
								<View style={styles.userLabel}>
									<Text style={styles.userLabelText}>部门:</Text>
								</View>
								<View style={styles.userValue}>
									<Text style={styles.userValueText}>{this.state.department}</Text>
								</View>
							</View>
						</View>
						<View style={styles.userButtonsRow}>
							<Button handlePress={this._signout.bind(this)}>注销</Button>
						</View>
					</ScrollView>
				</View>
				{this.state.pending ? <Loading /> : null}
			</View>
		);
	}

	_signout() {
		var that = this;

		userStorage.token('free').then(function() {
			that.props.navigator.immediatelyResetRouteStack([]);
			that.props.navigator.push({pathname: '/signin', component: SignIn});
		});
	}
}

export default User;