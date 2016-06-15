import React, {
	Component,
	View,
	Text,
	Image,
	AsyncStorage,
	TouchableOpacity,
	Dimensions,
	Animated
} from 'react-native';

import Settings from './icons-grid-settings.js';
import styles from './icons-grid.style.js';

var { width } = Dimensions.get('window');

const ICON_ADD = require('./images/icon-add.png');
const ICON_DEFAULT = require('./images/icon-default.png');

class IconsGrid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedItems: [],
			openSettings: false,
			settingsOpenBounceValue: new Animated.Value(0)
		};
	}

	componentDidMount() {
		this._updateGridData();
	}

	render() {
		var addItemRow = (
			<View style={styles.gridRow}>{this._renderSettingButton()}</View>
		);

		var settings = (
			<Animated.View style={[styles.settings, {transform: [{translateX: this.state.settingsOpenBounceValue}]}]}>
				<Settings
					selectedItems={this.state.selectedItems}
					fullData={this.props.fullData}
					done={this._updateGridData.bind(this)}
					cancel={this._close.bind(this)} />
			</Animated.View>
		);

		return (
			<View style={styles.container}>
				<View style={styles.grid}>
					{this._renderGridItems()}
					{this.state.settingButtonInNewLine && addItemRow || null}
				</View>
				{this.state.openSettings && settings}
			</View>
		);
	}

	_renderGridItems() {
		var grid = [],
			data = this._generateSelectedData(this.state.selectedItems),
			cellSize = this.props.cellSize,
			that = this,
			rowSize,

			renderCellWidthAdd = function(row, i) {
				var items = that._renderGridCell(row);

				if (i === rowSize - 1 && items.length < cellSize) {
					items.push(that._renderSettingButton());
					that.state.settingButtonInNewLine = false;
				}

				return items;
			};

		data.forEach(function(item, i) {
			var rowIndex = Math.floor(i / cellSize);

			if (i % cellSize === 0) {
				grid[rowIndex] = [];
			}
			grid[rowIndex].push(item);
		});

		rowSize = grid.length;

		this.state.settingButtonInNewLine = true;

		return grid.map(function(row, i) {
			return (
				<View key={i} style={styles.gridRow}>
					{renderCellWidthAdd(row, i)}
				</View>
			);
		});
	}

	_renderGridCell = function(data) {
		var icon,
			that = this;

		return data.map(function(item) {
			icon = item.icon || ICON_DEFAULT;

			return (
				<TouchableOpacity key={item.id} style={[styles.gridItem, {width: width / that.props.cellSize}]} onPress={that.props.onPress.bind(that, item.id)}>
					<View style={styles.gridItemWrapper}>
						<View style={styles.gridItemIconWrapper}>
							<Image style={styles.gridItemIcon} source={icon} />
						</View>
						<Text style={styles.gridItemLabel}>{item.label}</Text>
					</View>
				</TouchableOpacity>
			);
		});
	}

	_renderSettingButton() {
		return (
			<TouchableOpacity style={[styles.gridItem, {width: width / this.props.cellSize}]} onPress={this._setting.bind(this)}>
				<View style={styles.gridItemWrapper}>
					<View style={[styles.gridItemIconWrapper, styles.gridAddIconWrapper]}>
						<Image style={styles.gridItemIcon} source={ICON_ADD} />
					</View>
					<Text style={[styles.gridItemLabel]}>更多</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_updateGridData(settingsSelectedItems) {
		var that = this;

		if (settingsSelectedItems) {
			this.setState({
				selectedItems: settingsSelectedItems
			});

			this._close();
		}

		AsyncStorage.getItem('icons-grid-selected').then(function(data) {
			that.setState({
				selectedItems: JSON.parse(data) || that.props.selectedItems
			});
		});
	}

	_generateSelectedData(selectedItems) {
		var source = {},
			ret = [];

		this.props.fullData.forEach(function(item) {
			source[item.id] = item;
		});

		selectedItems.forEach(function(id) {
			ret.push(source[id]);
		});

		return ret;
	}

	_setting() {
		this.setState({
			openSettings: true
		});

		this.state.settingsOpenBounceValue.setValue(width);
		Animated.spring(
			this.state.settingsOpenBounceValue,
			{
				toValue: 0,
				tension: 10
			}
		).start();
	}

	_close() {
		var that = this;

		this.state.settingsOpenBounceValue.setValue(0);
		Animated.spring(
			this.state.settingsOpenBounceValue,
			{
				toValue: width,
				tension: 20
			}
		)
			.start(function() {
				that.setState({
					openSettings: false
				});
			});
	}
}

IconsGrid.propTypes = {
	fullData: React.PropTypes.array.isRequired,
	selectedItems: React.PropTypes.array.isRequired,
	cellSize: React.PropTypes.number.isRequired,
	onPress: React.PropTypes.func.isRequired
};

export default IconsGrid;