import ship from './ship.js';

const createBoard = function createBoardArr(){
    const yAxisArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const xAxisArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const boardArr = [];
    const boardSpaceObj = function boardSpaceObj(nameOfSpace){
        const name = nameOfSpace;
        const shipOnSpace = null;
       return  { name, shipOnSpace };
    };
    for(let i = 0; i < yAxisArr.length; i+=1){
        const boardSpace = yAxisArr[i];
        for(let j = 0; j < xAxisArr.length; j+=1){
            const newSpace = boardSpaceObj(boardSpace + xAxisArr[j]);
            boardArr.push(newSpace);
        };
    };
    return boardArr;
};

const createShipsToPlace = function createShipsToPlace(){
    const carrier = ship(5, 'carrier');
    const battleship = ship(4, 'battleship');
    const destroyer = ship(3, 'destroyer');
    const submarine = ship(3, 'submarine');
    const patrolBoat = ship(2, 'patrol boat');
    const shipsToPlaceArr = [];
    shipsToPlaceArr.push(carrier, battleship, destroyer, submarine, patrolBoat);
    return shipsToPlaceArr;
};

const gameboard = function gameboard(){
    const name = null;
    const board = createBoard();
    const boardArr = [];
    boardArr.push(...board);
    const shipsToPlace = createShipsToPlace();
    const shipsOnBoard = [];
    const missedShots = [];
    const placeShip = function placeShip(length, startCoord, endCoord){
        const myShip = ship(length);
        shipsOnBoard.push(myShip);
        const startCoordObj = boardArr.find((element) => element.name === startCoord);
        const endCoordObj = boardArr.find((element) => element.name === endCoord);
        if(startCoordObj.name[0] === endCoordObj.name[0]){
            for(let i=boardArr.indexOf(startCoordObj); i <= boardArr.indexOf(endCoordObj);i+=1){
                boardArr[i].shipOnSpace = myShip;
            };
        } else if(startCoordObj.name[1] === endCoordObj.name[1]){
            for(let i=boardArr.indexOf(startCoordObj); i <= boardArr.indexOf(endCoordObj);i+=10){
                boardArr[i].shipOnSpace = myShip;
            };
        };
    };
    const receiveAttack = function receiveAttack(coordinates){
        const coordinateOnBoard = boardArr.find((element) => element.name === coordinates);
        if(coordinateOnBoard.shipOnSpace){
            coordinateOnBoard.shipOnSpace.hit();
            return 'hit';
        };
        missedShots.push(coordinates);
        return 'miss';
    };
    const allSunk = false;
    const checkIfAllShipsSunk = function checkIfAllShipsSunk(){
        if(shipsOnBoard.every((element) => element.sunk === "sunk")){
            this.allSunk = true;
            return true;
        } return false;
    };
    return { name, boardArr, shipsToPlace, placeShip, receiveAttack, checkIfAllShipsSunk }
};

export default gameboard;