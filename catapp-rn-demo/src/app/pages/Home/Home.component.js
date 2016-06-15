import React, {
	Component,
	StatusBar,
	View
} from 'react-native';

import { TabBar, TabBarItem } from 'moles-cui'

import Charts from '../Charts/Charts.component.js';
import Message from '../Message/Message.component.js';
import Manager from '../Manager/Home/Manager.Home.component.js';
import User from '../User/User.component.js';
import styles from './Home.style.js';
import userStorage from '../../utils/userStorage.js';

var tabs = [
	{id: 'charts', title: '报表', icon: require('./images/icon-chart.png'), component: Charts},

	// 暂时没什么功能需要开发
	//{id: 'message', title: '消息', icon: require('./images/icon-message.png'), component: Message},

	{id: 'manager', title: '管理', icon: require('./images/icon-setting.png'), component: Manager},
	{id: 'user', title: '我的', icon: require('./images/icon-account.png'), component: User}
];


class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: tabs,
			selectTab: 'charts'
		};
	}

	componentDidMount() {
		var that = this;

		userStorage.getItem('user-role').then(function(role) {
			var len = tabs.length,
				otherRoleTabs = tabs.concat();

			if (role !== 'admin') {

				while (len--) {
					if (otherRoleTabs[len].id === 'manager') {
						otherRoleTabs.splice(len, 1);
					}
				}

				that.setState({
					dataSource: otherRoleTabs
				});
			}
		});
	}

	render() {
		var items = this.state.dataSource.map(function(tab) {
			return (
				<TabBarItem
					title={tab.title}
					icon={tab.icon}
					key={tab.id}
					selected={this.state.selectTab === tab.id}
					style={{backgroundColor: this._active(tab.id)}}
					onPress={() => {this.setState({selectTab: tab.id})}}>
					<tab.component navigator={this.props.navigator} />
				</TabBarItem>
			);
		}.bind(this));

		return (
			<View style={styles.container}>
				<StatusBar
					hidden={true}
				/>
				<TabBar>
					{items}
				</TabBar>
			</View>
		);
	}

	_active(tabid) {
		return this.state.selectTab === tabid ? '#38c' : 'transparent';
	}
}

export default Home;