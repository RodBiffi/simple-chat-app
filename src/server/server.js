const http = require('http');
const WebSocketServer = require('websocket').server;
const messagesStorage = require('./messagesStorage');

const server = http.createServer();
const wsServer = new WebSocketServer({
  httpServer: server
});

const messageTypes = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
};

wsServer.on('request', function(request) {
  const connection = request.accept(null, request.origin);

  connection.on('message', function(payload) {
    const data = JSON.parse(payload.utf8Data)
    console.log('Received Message:', data);
    let response = {
        type: data.type,
    };
    switch (data.type) {
        case messageTypes.ADD: {
            response = { ...response, ...messagesStorage.add(data.message)}
            break;
        }
        case messageTypes.EDIT: {
            response = { ...response, ...messagesStorage.edit(data.id, data.message)}
            break;
        }
        case messageTypes.DELETE: {
            response = { ...response, ...messagesStorage.del(data.id)}
            break;
        }
        default: {
            throw new Error('unsupported message type');
        }
    }
    connection.sendUTF(JSON.stringify(response));
  });

  connection.on('close', function() {
    console.log('Client has disconnected.');
  });
});

server.listen(8081);
