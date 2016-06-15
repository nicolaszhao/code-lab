import React, {
	Component
} from 'react-native';

import ManagerSubpage from './Manager.Subpage.component.js';
import { PASSED_LIST_REQUEST, UPDATE_PASSED_LIST_REQUEST } from '../../../config/requestUrls.js';

class ManagerPassed extends Component {
	render() {
		return (
			<ManagerSubpage
				title="已审核"
				navigator={this.props.navigator}
				requestPullUrl={PASSED_LIST_REQUEST}
				requestPushUrl={UPDATE_PASSED_LIST_REQUEST}
				genApprovedData={this.genApprovedData.bind(this)}
				/>
		);
	}

	genApprovedData(data) {
		var ret = [];

		if (!data) {
			return null;
		}

		data.forEach(function(item) {
			if (item.pass == 3) {
				ret.push({
					name: item.userName,
					status: 0
				});
			}
		});

		return ret.length ? ret : null;
	}
}

export default ManagerPassed;