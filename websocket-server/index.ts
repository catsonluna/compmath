import * as WebSocket from 'ws';
import { generateEquation } from './gen';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    const data = JSON.parse(message);
    console.log(data);
    if (data.type == "equation" ){
      let isPossible = false;
      let equation = generateEquation(Math.floor(Math.random() * 15) + 1);
      console.log(equation);
      while(!isPossible){
        // check if the result is a number
        if(!isNaN(equation["result"])){
          isPossible = true;
        }
        else{
          equation = generateEquation(data.level);
          console.warn("remaking");
        }
      }
      ws.send(JSON.stringify({ type: "equation", equation: equation["equationString"] }));
    }
  });

});
