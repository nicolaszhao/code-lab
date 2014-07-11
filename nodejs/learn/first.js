var i = 0;
setTimeout(function() {
	console.log(++i);
	setTimeout(arguments.callee, 1000);
}, 1000);
