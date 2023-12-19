import gameboard from "./gameboard.js";
import { player, compPlayer } from "./player.js";

const gameLoop = function runGameLoop() {
    const player1 = player();
    player1.board = gameboard();
    player1.board.name = 'player1';
    const computerPlayer = compPlayer();
    computerPlayer.board = gameboard();
    computerPlayer.board.name = 'computerPlayer';

    const checkForGameOver = function checkForGameOver(){
        if(player1.board.checkIfAllShipsSunk()){
            alert("Game over! Player Loses");
        } else if(computerPlayer.board.checkIfAllShipsSunk()){
            alert("Game over! Player Wins");
        };
    };

    const switchTurns = function switchTurns(){
        checkForGameOver();
        if(player1.isTurn){
            player1.isTurn = false;
            computerPlayer.isTurn = true;
        } else if(computerPlayer.isTurn){
            player1.isTurn = true;
            computerPlayer.isTurn = false;
        };
        player1.checkTurn();
        computerPlayer.checkTurnAndAttack(player1.board.boardArr);
    };

    return { player1, computerPlayer, switchTurns }
};

export default gameLoop;