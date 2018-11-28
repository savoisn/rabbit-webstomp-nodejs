const Stomp = require('stompjs');
const WebSocket = require('ws');

var ws = new WebSocket('ws://127.0.0.1:15674/ws');
var client = Stomp.over(ws);

var on_connect = function() {
    console.log('connected');
		client.heartbeat.outgoing = 20000
		var subscription = client.subscribe("/queue/test", function(message){
			console.log("received message:" + message);
		});
};
var on_error =  function() {
    console.log('error');
};

client.heartbeat.outgoing = 20000

client.connect('guest', 'guest', on_connect, on_error, '/');



process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    client.disconnect(function() {
      console.log("stomp connection closed!");
      process.exit();
    });
});



