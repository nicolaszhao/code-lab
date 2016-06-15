export const CHANGE_VALUE = 'change-value';
export const SET_INPUT_VISIBILITY = 'set-input-visibility';

export function changeValue(value) {
	return { type: 'change-value', value };
};

export function setInputVisibility(visible) {
	return { type: 'set-input-visibility', visible };
};