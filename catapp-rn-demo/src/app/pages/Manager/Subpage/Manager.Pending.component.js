import React, {
	Component
} from 'react-native';

import ManagerSubpage from './Manager.Subpage.component.js';
import { PENDING_LIST_REQUEST, UPDATE_PENDING_LIST_REQUEST } from '../../../config/requestUrls.js';

class ManagerPending extends Component {
	render() {
		return (
			<ManagerSubpage
				title="待审核"
				navigator={this.props.navigator}
			    requestPullUrl={PENDING_LIST_REQUEST}
			    requestPushUrl={UPDATE_PENDING_LIST_REQUEST}
				genApprovedData={this.genApprovedData.bind(this)}
				/>
		);
	}

	genApprovedData(data) {
		var ret = [],
			statusTypes = {
				'1': 1,
				'3': 0
			};

		if (!data) {
			return null;
		}

		data.forEach(function(item) {
			if (item.pass == 1 || item.pass == 3) {
				ret.push({
					name: item.userName,
					status: statusTypes[item.pass]
				});
			}
		});

		return ret.length ? ret : null;
	}
}

export default ManagerPending;