import React, {
	Component,
	View
} from 'react-native';

import Header from '../../components/Header.js';
import IconsGrid from '../../components/icons-grid/icons-grid.js';

var dataSource = [
	{
		id: '1',
		label: '报错大盘',
		icon: ''
	},
	{
		id: '2',
		label: '业务大盘',
		icon: ''
	},
	{
		id: '3',
		label: 'API访问趋势',
		icon: ''
	},
	{
		id: '4',
		label: '访问量分布',
		icon: ''
	},
	{
		id: '5',
		label: '每天报表统计',
		icon: ''
	},
	{
		id: '6',
		label: 'Health',
		icon: ''
	},
	{
		id: '7',
		label: 'Transaction',
		icon: ''
	},
	{
		id: '8',
		label: 'Event',
		icon: ''
	},
	{
		id: '9',
		label: '报错大盘',
		icon: ''
	},
	{
		id: '10',
		label: '业务大盘',
		icon: ''
	},
	{
		id: '11',
		label: 'API访问趋势',
		icon: ''
	},
	{
		id: '12',
		label: '访问量分布',
		icon: ''
	},
	{
		id: '13',
		label: '每天报表统计',
		icon: ''
	},
	{
		id: '14',
		label: 'Health',
		icon: ''
	},
	{
		id: '15',
		label: 'Transaction',
		icon: ''
	},
	{
		id: '16',
		label: 'Event',
		icon: ''
	}
];

class IconsGridDemo extends Component {
	render() {
		var headerButtons = {
			left: true
		};

		return (
			<View style={{flex: 1}}>
				<Header buttons={headerButtons} title="Icons Grid Demo" navigator={this.props.navigator} />
				<IconsGrid
					fullData={dataSource}
					selectedItems={[1, 2, 3]}
					cellSize={4}
				    onPress={this._pressHandler.bind(this)}
					/>
			</View>
		);
	}

	_pressHandler(id) {
		alert('当前 icon 的 id：' + id);
	}
}

export default IconsGridDemo;