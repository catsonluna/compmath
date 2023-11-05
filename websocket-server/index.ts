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
        sessionToken: data.sessionToken,
        lives: 7
      });
      ws.send(JSON.stringify({ type: "joined", gameId: data.gameId }));
      console.log(games);
      if (game.players.length == 2) {
        // generate an equation
        let equation = generateEquation(Math.floor(Math.random() * 15) + 1);
        console.log(equation);
        game.current = equation;
        game.history.push(equation);
        game.remainingTime = 30;
        /// send the equation to both players
        game.players.forEach((player: any) => {
          player['ws'].send(JSON.stringify({ type: "start", equation: equation["equationString"] }));
        });
      }
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
       
      game.players.forEach((player: any) => {

        player['ws'].send(JSON.stringify({ type: "equation", equation: equation["equationString"] }));
      });
      console.log(games);
    }if (data.type == "answer" ){
      // save the answer
      let game = games.get(data.gameId);
      let anwser_player = game.players.find((player: any) => player.sessionToken == data.sessionToken);
      // set anwser_player awnsered bool to true
      anwser_player.answered = true;
      
      let answer = data.answer;
      let correct = false;
      if (answer == game.current["result"]){
        correct = true;
      }
      if(!correct){
        // subtract a life from the player
        anwser_player.lives--;
      }
      // send the answer to the other player
      // send if the answer is correct or not back to the player
      game.players.forEach((player: any) => {
        player['ws'].send(JSON.stringify({ type: "answer", correct: correct, sessionToken: anwser_player.sessionToken }));
      });
      game.history.push({equationString: game.current["equationString"], result: game.current["result"], answer: answer, correct: correct, sessionToken: anwser_player.sessionToken});
      // check if both players have answered
      let allAnswered = true;
      game.players.forEach((player: any) => {
        if(!player.answered){
          allAnswered = false;
        }
      });

      if(anwser_player.lives == 0){
        // send game over to both players
        game.players.forEach((player: any) => {
          player['ws'].send(JSON.stringify({ type: "gameover" }));
        });
        // delete the game
        games.delete(data.gameId);
      }

      if(allAnswered){
        // start a timer for 30 seconds in a new thread
        // when the timer is done, send a new equation to all players
        let equation = generateEquation(Math.floor(Math.random() * 15) + 1);
        console.log(equation);
        game.current = equation;
        game.history.push(equation);
        game.remainingTime = 30;
        game.players.forEach((player: any) => {
          player.answered = false;
          player['ws'].send(JSON.stringify({ type: "next", equation: equation["equationString"] }));
        });
      }

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
