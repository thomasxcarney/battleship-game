import gameLoop from "./gameController.js";

const header = document.getElementById('header');
const gameInfoContainer = document.getElementById('game-info');
const gameContainer = document.getElementById('game');

const myGameLoop = gameLoop();

const createBoards = function createAndPopulateGameboardContainers(){
    const playerBoardContainer = document.getElementById('playerBoardContainer');
    const computerBoardContainer = document.getElementById('computerBoardContainer');
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

    const reloadHTMLBoard = function reloadHTMLBoard(board, container, player){
        container.innerHTML = '';
        createHTMLBoard(board, container, player)
    };

    const addPlaceShipsBtnEventListener = function addPlaceShipsBtnEventListener(){
        const placePlayerShipsBtn = document.getElementById('place-ships-button');
        placePlayerShipsBtn.addEventListener('click', () => {
            myGameLoop.player1.placePlayerShips();
            reloadHTMLBoard(playerBoard, playerBoardContainer, myGameLoop.player1);
        });
        const placeCompShipsBtn = document.getElementById('place-comp-ships-button');
        placeCompShipsBtn.addEventListener('click', () => {
            myGameLoop.computerPlayer.placeComputerShips();
            reloadHTMLBoard(computerBoard, computerBoardContainer, myGameLoop.computerPlayer);
        });
    };
    
    createHTMLBoard(computerBoard, computerBoardContainer, myGameLoop.computerPlayer);
    createHTMLBoard(playerBoard, playerBoardContainer, myGameLoop.player1);
    addPlaceShipsBtnEventListener();
};

createBoards();