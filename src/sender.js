const Stomp = require('stompjs');
const WebSocket = require('ws');

var ws = new WebSocket('ws://127.0.0.1:15674/ws');
var client = Stomp.over(ws);

var on_connect = function() {
  console.log('connected');
  client.send("/queue/test", {priority: 9}, "Hello, STOMP");
  client.disconnect(function() {
    console.log("stomp connection closed!");
    process.exit();
  });
};
var on_error =  function() {
  console.log('error');
};


client.connect('guest', 'guest', on_connect, on_error, '/');

process.on('SIGINT', function() {
  console.log("Caught interrupt signal");

  client.disconnect(function() {
    console.log("stomp connection closed!");
    process.exit();
  });
});
