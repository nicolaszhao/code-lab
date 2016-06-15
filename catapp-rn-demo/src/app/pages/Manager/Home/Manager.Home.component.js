import React, {
	Component,
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import Header from '../../../components/Header.js';
import styles from './Manager.Home.style.js';
import ManagerPending from './../Subpage/Manager.Pending.component.js';
import ManagerPassed from './../Subpage/Manager.Passed.component.js';
import ManagerRefused from './../Subpage/Manager.Refused.component.js';
import ManagerSetting from './../Subpage/Manager.Setting.component.js';

class Manager extends Component {
	constructor(props) {
		super(props);
		
		this.items = [
			{
				value: 'pending',
				label: '待审核',
				component: ManagerPending
			},
			{
				value: 'passed',
				label: '已审核',
				component: ManagerPassed
			},
			{
				value: 'refused',
				label: '已拒绝',
				component: ManagerRefused
			},
			{
				value: 'setting',
				label: '环境设置',
				component: ManagerSetting
			}
		];
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="管理" />
				<View style={styles.content}>
					<ScrollView style={styles.items}>
						{this._renderItems()}
					</ScrollView>
				</View>
			</View>
		);
	}

	_renderItems() {
		return this.items.map(function(item, i) {
			var itemStyles = [styles.item];

			if (i === 0) {
				itemStyles.push(styles.itemFirst);
			}

			return (
				<TouchableOpacity key={item.value} style={itemStyles} onPress={this._pressHandler.bind(this, item)}>
					<View style={styles.itemTextWrapper}>
						<Text style={styles.itemText}>{item.label}</Text>
					</View>
					<View style={styles.itemIconWrapper}>
						<Image style={styles.itemIcon} source={require('../../../images/icon-arrow-r.png')} />
					</View>
				</TouchableOpacity>
			);
		}.bind(this));
	}

	_pressHandler(item) {
		this.props.navigator.push({
			pathname: '/manager/' + item.value,
			component: item.component
		});
	}
}

export default Manager;