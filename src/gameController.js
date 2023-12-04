import gameboard from "./gameboard.js";
import { player, compPlayer } from "./player.js";

const gameLoop = function runGameLoop() {
    const player1 = player();
    const computerPlayer = compPlayer();
    const playerBoard = gameboard();
    const computerBoard = gameboard();
    const placeShips = function placeShips(board){
        board.placeShip(5, 'A1', 'A5');
        board.placeShip(4, 'C1', 'C4');
        board.placeShip(3, 'F1', 'F3');
        board.placeShip(3, 'H1', 'H3');
        board.placeShip(2, 'I9', 'J9');
    };
    placeShips(playerBoard);
    placeShips(computerBoard);
    return { playerBoard, computerBoard }
};

export default gameLoop;