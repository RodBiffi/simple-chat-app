const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
const wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  const connection = request.accept(null, request.origin);

  connection.on('message', function(message) {
    const msg = JSON.parse(message.utf8Data)
    console.log('Received Message:', msg.msg);
    connection.sendUTF('Hi this is WebSocket server!');
  });

  connection.on('close', function(reasonCode, description) {
    console.log('Client has disconnected.');
  });
});

server.listen(8081);
