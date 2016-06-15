export default function param(args) {
	var ret = [];

	for (var key in args) {
		ret.push(key + '=' + encodeURIComponent(args[key]));
	}

	return ret.join('&');
}