var COLORS = [
	'#e21400', '#91580f', '#f8a700', '#f78b00',
	'#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	'#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

var usernameButton = document.getElementById('btn-nickname');
var messageButton = document.getElementById('btn-chat');
var inputMessage = document.getElementById('input-message');
var inputNickname = document.getElementById('input-nickname');
var username = null;
var connected = false;
var numUsers = -1;

var socket = io();

function login() {
	username = inputNickname.value;
	if(username) {
		usernameButton.disabled = true;
		inputNickname.disabled = true;               
		socket.emit('login', username);
	}
}

function sendMessage() {
	var message = inputMessage.value;
	if(message != null && message.length != 0 && connected) {
		inputMessage.value = "";
		addMessageElement({
			username: username,
			message: message
		});
		socket.emit('new message', message);
	}
	inputMessage.focus();
}

function addMessageElement(data) {
	var p = document.createElement('p');
	var text = document.createTextNode(data.message);
	p.appendChild(text);

	var strongName = document.createElement('strong');
	strongName.classList = "primary-font";
	strongName.style.color = getUsernameColor(data.username);
	strongName.appendChild(document.createTextNode(data.username));

	var header = document.createElement('div');
	header.classList = "header";
	header.appendChild(strongName);

	var chatBody = document.createElement('div');
	chatBody.classList = "chat-body clearfix";
	chatBody.appendChild(header);
	chatBody.appendChild(p);

	var left = document.createElement('li');
	left.classList = "left clearfix";
	left.appendChild(chatBody);

	var chat = document.getElementById('message-box');
	chat.appendChild(left);

	var panels = document.getElementById('panels');
	panels.scrollTop = panels.scrollHeight;
}

function getUsernameColor (username) {
	var hash = 7;
	for (var i = 0; i < username.length; i++) {
		hash = username.charCodeAt(i) + (hash << 5) - hash;
	}
	var index = Math.abs(hash % COLORS.length);
	return COLORS[index];
}

function log (message) {
	var logText = document.getElementById("log");
	logText.innerHTML = message;
}

usernameButton.onclick = login;
messageButton.onclick = sendMessage;

socket.on('joined', function(data) {
	connected = true;
	numUsers = data.numUsers;
	log(numUsers + " kişi online");
});

socket.on('new message', function(data) {
  	addMessageElement(data);
});

socket.on('user joined', function(data) {
	log(data.numUsers + " kişi online");
});