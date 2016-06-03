var delay = function(ms) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve(Math.floor(Math.random() * 10));
		}, ms);
	});
};

async function fn(ms) {
	var r1 = await delay(ms);
	console.log('r1: ' + r1);
	var r2 = await delay(ms);
	console.log('r2: ' + r2);
};

fn(1000);