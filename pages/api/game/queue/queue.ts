import { generateSecret } from "@/lib/utils";

let queue = new Map();

let games = new Map();

export function getQueue() {
    return queue;
}

export function addToQueue(user: any) {
    queue.set(user.user_id, {
        elo: user.elo,
        joined: Date.now(),
        user_id: user.user_id,
    });
}

export function removeFromQueue(user_id: string) {
    queue.delete(user_id);
}

export function getQueueSize() {
    return queue.size;
}

export function inQueue(user_id: string) {
    return queue.has(user_id);
}

export function findAGame(user_id: string) {
    let game_id = null;
    queue.forEach((value, key) => {
        if(value.user_id != user_id){
            game_id = createGame(user_id, value.user_id);
            removeFromQueue(user_id);
            removeFromQueue(value.user_id);
        }
    });
    return game_id;
}

export function createGame(user1_id: any, user2_id: any) {
    const game_id = generateSecret(32);
    games.set(game_id, {
        game_id,
        participants: {user1_id:{
            ready: false,
            anwsers: [],
            lifes: 7,
        }, user2_id:{
            ready: false,
            anwsers: [],
            lifes: 7,
        }},
        started: Date.now(),
        ongoing: false,
        winner: null,
        rounds: [],
        difficulty: 1,
        round: 1,

    });
    return game_id;
}

export function getGame(game_id: string) {
    return games.get(game_id);
}

export function inAGame(user_id: string) {
    let inGame = false;
    let game_id = null;
    games.forEach((value, key) => {
        if(value.participants.user1_id == user_id || value.participants.user2_id == user_id){
            inGame = true;
            game_id = key;
        }
    });
    return [inGame, game_id];
}