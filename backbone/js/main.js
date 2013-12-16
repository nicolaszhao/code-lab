require.config({
	paths: {
		'jquery': 'http://code.jquery.com/jquery-1.10.2.min',
		'backbone': 'libs/backbone',
		'underscore': 'libs/underscore'
	},
	shim: {
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		}
	}
});

require(['backbone', 'underscore'], function(Backbone, _) {
	var View = Backbone.View.extend({
		tagName: 'p',
		
		render: function() {
			this.$el.html(this.messages).appendTo('#logs');
		},
		
		initialize: function() {
			this.render();
		},
		
		messages: function() {
			var ret = _.functions($());
			
			return ret.join('<br />');
		}
	});
	 
	new View();
});