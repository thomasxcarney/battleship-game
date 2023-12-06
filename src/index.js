import gameLoop from "./gameController.js";

const header = document.getElementById('header');
const gameInfoContainer = document.getElementById('game-info');
const gameContainer = document.getElementById('game');

const myGameLoop = gameLoop();

const createBoards = function createAndPopulateGameboardContainers(){
    const playerBoardContainer = document.createElement('div');
    playerBoardContainer.setAttribute('id', 'playerBoardContainer');
    playerBoardContainer.classList.add('board-container');
    const computerBoardContainer = document.createElement('div');
    computerBoardContainer.setAttribute('id', 'computerBoardContainer');
    computerBoardContainer.classList.add('board-container');
    gameContainer.append(computerBoardContainer, playerBoardContainer);
    const playerBoard = myGameLoop.player1.board;
    const computerBoard = myGameLoop.computerPlayer.board;
    const addCellEventListener = function addCellEventListener(cell, cellInArr, board, player){
        cell.addEventListener('click', () => {
            if(!player.isTurn){
                if(board.receiveAttack(cellInArr.name) === 'hit'){
                    cell.classList.add('hit-cell');
                } else if (board.receiveAttack(cellInArr.name) === 'miss'){
                    cell.classList.add('miss-cell');
                };
                myGameLoop.switchTurns();
            };
        });
    };
    const createHTMLBoard = function createHTMLBoard(board, container, player){
        const {boardArr} = board;
        boardArr.forEach(element => {
            const gridContainer = document.createElement('div');
            addCellEventListener(gridContainer, element, board, player);
            gridContainer.classList.add('gridSquare');
            gridContainer.setAttribute('id', `${board.name  } ${  element.name}`);
            if(element.shipOnSpace != null){
                gridContainer.classList.add('hasShip');
            };
            gridContainer.innerHTML = element.name;
            container.append(gridContainer);
        });
    };
    createHTMLBoard(playerBoard, playerBoardContainer, myGameLoop.player1);
    createHTMLBoard(computerBoard, computerBoardContainer, myGameLoop.computerPlayer);
};

createBoards();