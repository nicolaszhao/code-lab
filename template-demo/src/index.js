import View from './view.js';

var view = new View();

view.render(document.getElementById('demo-1'), {
	name: 'Nicolas',
	age: '34',
	experience: [
		'ctrip',
		'baidu',
		'perfect world'
	]
});