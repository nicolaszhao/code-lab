var $doc = $(document),
	$win = $(window);

var inScreen = function(el) {
	var top = el.offset().top,
		ret = false;

	if (top <= $doc.scrollTop() + $win.height()) {
		ret = true;
	}

	return ret;
};

var showTarget = function() {
	$('#container').find('> div:not(.state-visible)').each(function() {
		var el = $(this);

		if (inScreen(el)) {
			el.addClass('state-visible');
			setTimeout(function() {
				el.addClass('state-loaded');
			}, 17);
		}
	});
};

var throttle = function(fn, wait) {
	var context, args, timeout,
		previous = 0;

	var later = function() {
		previous = Date.now();
		timeout = null;
		fn.apply(context, args);
		context = args = null;
	};

	return function() {
		var now = Date.now(),
			remaining = wait - (now - previous);

		context = this;
		args = arguments;

		if (remaining <= 0) {
			if (timeout) {
				clearTimeout(timeout);
			}
			later();
		} else if (!timeout) {
			timout = setTimeout(later, remaining);
		}
	};
};

showTarget();

$win.on('scroll', throttle(showTarget, 500));