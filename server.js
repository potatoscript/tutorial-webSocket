import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port:8080});
wss.on('connection', client => {
    // when a client send message we want to send the message to all the other
    client.on('message',(message,isBinary) => {
        [...wss.clients]
        // filter up the message from the sender
        .filter(c=>c!==client)
        // check if the message is binary or not
        .forEach(c=>c.send(isBinary ? message.toString() : message));
    });
})
