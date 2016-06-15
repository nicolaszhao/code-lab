import React, {
	Component,
	View,
	Text
} from 'react-native';

import Header from '../../components/Header.js';
import styles from './Message.style.js';

class Message extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Header title="消息" />
				<View style={styles.content}>
					<Text style={{fontSize: 20}}>玩命开发中...</Text>
				</View>
			</View>
		);
	}
}

export default Message;