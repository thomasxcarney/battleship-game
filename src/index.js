import gameLoop from "./gameController.js";

const header = document.getElementById('header');
const gameContainer = document.getElementById('game');

const createBoards = function createAndPopulateGameboardContainers(){
    const playerBoardContainer = document.createElement('div');
    playerBoardContainer.setAttribute('id', 'playerBoardContainer');
    playerBoardContainer.classList.add('board-container');
    const computerBoardContainer = document.createElement('div');
    computerBoardContainer.setAttribute('id', 'computerBoardContainer');
    computerBoardContainer.classList.add('board-container');
    gameContainer.append(computerBoardContainer, playerBoardContainer);
    const {playerBoard} = gameLoop();
    const {computerBoard} = gameLoop();
    const createHTMLBoard = function createHTMLBoard(board, container){
        const {boardArr} = board;
        boardArr.forEach(element => {
            const gridContainer = document.createElement('div');
            gridContainer.classList.add(element.name, 'gridSquare');
            if(element.shipOnSpace != null){
                gridContainer.classList.add('hasShip');
            };
            gridContainer.innerHTML = element.name;
            container.append(gridContainer);
        });
    };
    createHTMLBoard(playerBoard, playerBoardContainer);
    createHTMLBoard(computerBoard, computerBoardContainer);
};

createBoards();