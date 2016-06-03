var $doc = $(document),
	$win = $(window);

var inScreen = function(el) {
	var offset = el.offset(),
		height = el.outerHeight(),
		a = offset.top,
		b = a + height,
		a2 = $doc.scrollTop(),
		b2 = a2 + $win.height(),
		ret = false,
		visibleHeight, topRemaining, bottomRemaining;

	if (b <= a2 || a >= b2 ) {
		ret = false;
	} else {
		topRemaining = a - a2;
		bottomRemaining = b - b2;
		topRemaining = topRemaining > 0 ? topRemaining : 0;
		bottomRemaining = bottomRemaining > 0 ? bottomRemaining : 0;
		visibleHeight = b - a2 - topRemaining - bottomRemaining;
		ret = visibleHeight > height / 3
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

var i = 0,
	parent = document.querySelector('#container'),
	el;

while (i++ < 100) {
	el = document.createElement('div');
	el.id = 'div-' + i;
	parent.appendChild(el);
}

showTarget();

$win.on('scroll', throttle(showTarget, 500));