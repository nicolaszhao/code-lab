import { combineReducers } from 'redux'
import {
	CHANGE_VALUE,
	SET_INPUT_VISIBILITY
} from './actions.js'

var value = function(state = 0, action) {
	switch (action.type) {
		case CHANGE_VALUE:
			return action.value;
		default:
			return state;
	}
};

var inputVisibility = function(state = false, action) {
	switch (action.type) {
		case SET_INPUT_VISIBILITY:
			return action.visible;
		default:
			return state;
	}
};

const reducers = combineReducers({
	value,
	inputVisibility
});

export default reducers;