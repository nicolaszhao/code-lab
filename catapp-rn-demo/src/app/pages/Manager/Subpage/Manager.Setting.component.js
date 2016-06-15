import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';

import Header from '../../../components/Header.js';
import Radiobox from '../../../components/Radiobox.js';
import userStorage from '../../../utils/userStorage.js';
import baseStyle from '../../../styles/baseStyles.js';

class ManagerSetting extends Component {
	constructor(props) {
		super(props);

		this.serverTypes = ['uat', 'pro', 'fat'];
		this.defaultType = 'fat';

		this.state = {
			serverType: this.defaultType
		};
	}

	componentDidMount() {
		var that = this;

		userStorage.getItem('server-type')
			.then(function(type) {
				that.setState({
					serverType: type || that.defaultType
				});
			});
	}

	render() {
		var selectedIndex = this.serverTypes.indexOf(this.state.serverType),
			values = this.serverTypes.map(function(type) {
				return type.toUpperCase();
			}),
			buttons = {
				left: true
			},
			icon = this._getIcon();

		return (
			<View>
				<Header buttons={buttons} title="环境设置" navigator={this.props.navigator} />
				<View style={styles.content}>
					<View style={styles.controlItem}>
						<Image style={styles.icon} source={icon} />
						<View style={styles.controlItemValue}>
							<Text>{values[selectedIndex]} 环境</Text>
						</View>
						<Radiobox
							style={styles.radiobox}
							values={values}
							selectedIndex={selectedIndex}
							onValueChange={this._valueChangeHandler.bind(this)} />
					</View>
				</View>
			</View>
		);
	}

	_valueChangeHandler(value) {
		var type = value.toLowerCase();

		this.setState({
			serverType: type
		});

		userStorage.setItem('server-type', type);
	}

	_getIcon() {
		var icon;

		switch (this.state.serverType) {
			case this.serverTypes[0]:
				icon = require('../../../images/icon-uat.png');
				break;
			case this.serverTypes[1]:
				icon = require('../../../images/icon-prd.png');
				break;
			default:
				icon = require('../../../images/icon-fat.png');
		}

		return icon;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: baseStyle.container.backgroundColor
	},
	content: {
		paddingTop: 20
	},
	controlItem: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		paddingLeft: 10,
		paddingRight: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#fff'
	},
	icon: {
		width: 16,
		height: 16
	},
	controlItemValue: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: 'center'
	},
	radiobox: {
		width: 120
	}
});

export default ManagerSetting;