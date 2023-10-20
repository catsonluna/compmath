import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log(`Received message => ${message}`);
  });

  ws.send('Hello! Message from server!!');
});
