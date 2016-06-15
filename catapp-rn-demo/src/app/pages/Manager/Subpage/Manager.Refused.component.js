import React, {
	Component
} from 'react-native';

import ManagerSubpage from './Manager.Subpage.component.js';
import { REFUSED_LIST_REQUEST, UPDATE_REFUSED_LIST_REQUEST } from '../../../config/requestUrls.js';

class ManagerRefused extends Component {
	render() {
		return (
			<ManagerSubpage
				title="已拒绝"
				navigator={this.props.navigator}
				requestPullUrl={REFUSED_LIST_REQUEST}
				requestPushUrl={UPDATE_REFUSED_LIST_REQUEST}
				genApprovedData={this.genApprovedData.bind(this)}
			    adjustData={this.adjustData}
				/>
		);
	}

	genApprovedData(data) {
		var ret = [];

		if (!data) {
			return null;
		}

		data.forEach(function(item) {
			if (item.pass == 1) {
				ret.push({
					name: item.userName,
					status: 1
				});
			}
		});

		return ret.length ? ret : null;
	}

	adjustData(data) {
		return data.map(function(item, i) {
			item.index = i;
			item.pass = 3;
			return item;
		});
	}
}

export default ManagerRefused;