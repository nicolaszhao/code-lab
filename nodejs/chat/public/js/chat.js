var Chat = function(socket) {
	this.socket = socket;
};

Chat.prototype = {
	constructor: Chat,
	sendMessage: function(room, text) {
		var message = {
			room: room,
			text: text
		};
		
		this.socket.emit('message', message);
	},
	changeRoom: function(room) {
		this.socket.emit('join', {
			newRoom: room
		});
	},
	precessCommand: function(command) {
		var words = command.split(' '),
			command = words[0].substring(1, words[0].length)
				.toLowerCase(),
			
			message = false,
			room, name;
			
		switch(command) {
			case 'join':
				words.shift();
				room = words.join(' ');
				this.changeRoom(room);
				break;
			
			case 'nick':
				words.shift();
				name = words.join(' ');
				this.socket.emit('nameAttempt', name);
				break;
			
			default:
				message = 'Unrecognized command.';
				break;
		}
		
		return message;
	}
};
