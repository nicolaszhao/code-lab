var formatNumber = function(value, len) {
	if (typeof len === 'undefined') {
		len = 2;
	}
	return ('0' + value).substr(-len);
};

var formatDate = function(date) {
	var month = formatNumber(date.getMonth() + 1),
		day = formatNumber(date.getDate()),
		hour = formatNumber(date.getHours()),
		minute = formatNumber(date.getMinutes());

	return `${date.getFullYear()}/${month}/${day} ${hour}:${minute}`;
};

var formatRate = function(n) {
	if (isNaN(parseFloat(n))) {
		n = '--';
	} else {
		n = (parseFloat(n * 100)).toFixed(2) + '%';
	}

	return n;
}

export { formatNumber, formatDate, formatRate };