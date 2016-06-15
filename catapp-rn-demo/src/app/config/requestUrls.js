const URL_BASE = 'http://10.8.85.26:8080/catapp';
	//'https://opsgateway.ctrip.com/api/13000/catapp';

export const LOGIN_REQUEST = URL_BASE + '/login';
export const RELOGIN_REQUEST = URL_BASE + '/updaterelogin';
export const CHECK_TOKEN_REQUEST = URL_BASE + '/checktoken';
export const PENDING_LIST_REQUEST = URL_BASE + '/getpendingchecklist';
export const UPDATE_PENDING_LIST_REQUEST = URL_BASE + '/uploadchecklist';
export const PASSED_LIST_REQUEST = URL_BASE + '/getpasschecklist';
export const UPDATE_PASSED_LIST_REQUEST = URL_BASE + '/uploadpendingchecklist';
export const REFUSED_LIST_REQUEST = URL_BASE + '/getrejectchecklist';
export const UPDATE_REFUSED_LIST_REQUEST = URL_BASE + '/uploadpasschecklist';
export const PROFILE_REQUEST = URL_BASE + '/getuserinfo';
export const ERRORS_REQUEST = URL_BASE + '/getErrors';
