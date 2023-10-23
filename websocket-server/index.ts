import * as WebSocket from 'ws';
import { generateEquation } from './gen';
const wss = new WebSocket.Server({ port: 8080 });
let games = new Map<string, any>();

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    const data = JSON.parse(message);
    console.log(data);
    if (data.type == "join") {
      let game = games.get(data.gameId);
      if (game == undefined) {
        game = {
          players: [],
          gameId: data.gameId,
          level: 1,
          remainingTime: 0,
          current: {
            equationString: "",
            result: 0
          },
          history: []
        };
        games.set(data.gameId, game);
      }
      game.players.push({
        ws: ws,
        userId: data.userId,
        lives: 5
      });
      ws.send(JSON.stringify({ type: "joined", gameId: data.gameId }));
      console.log(games);
    }
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
      let game = games.get(data.gameId);
      game.current = equation;
      game.history.push(equation);
      game.remainingTime = 30;
      // start a timer for 30 seconds in a new thread
      // when the timer is done, send a new equation to all players
       
      game.players.forEach((player: WebSocket) => {
        player.send(JSON.stringify({ type: "equation", equation: equation["equationString"] }));
      });
      console.log(games);
    }
  });
});


class Timer {
  timerId: any;
  
  constructor() {
    this.timerId = null;
  }

  start(callback: any, delay: number) {
    // If a timer is already running, clear it
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    // Start a new timer
    this.timerId = setTimeout(callback, delay);
  }
}

// Usage
const timer = new Timer();
timer.start(() => console.log('Hello, world!'), 1000); // Starts a timer
timer.start(() => console.log('Hello, again!'), 2000); // Cancels the previous timer and starts a new one
