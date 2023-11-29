import ship from './ship';

const createBoard = function createBoardArr(){
    const xAxisArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const yAxisArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const boardArr = [];
    const boardSpaceObj = function boardSpaceObj(nameOfSpace){
        const name = nameOfSpace;
        const shipOnSpace = null;
       return  { name, shipOnSpace };
    };
    for(let i = 0; i < xAxisArr.length; i+=1){
        const boardSpace = xAxisArr[i];
        for(let j = 0; j < yAxisArr.length; j+=1){
            const newSpace = boardSpaceObj(boardSpace + yAxisArr[j]);
            boardArr.push(newSpace);
        };
    };
    return boardArr;
};

const gameboard = function gameboard(){
    const board = createBoard();
    const shipsOnBoard = [];
    const missedShots = [];
    const placeShip = function placeShip(length, startCoord, endCoord){
        const myShip = ship(length);
        shipsOnBoard.push(myShip);
        const startCoordObj = board.find((element) => element.name === startCoord);
        const endCoordObj = board.find((element) => element.name === endCoord);
        startCoordObj.shipOnSpace = myShip;
        endCoordObj.shipOnSpace = myShip;
    };
    const receiveAttack = function receiveAttack(coordinates){
        const coordinateOnBoard = board.find((element) => element.name === coordinates);
        if(coordinateOnBoard.shipOnSpace){
            coordinateOnBoard.shipOnSpace.hit();
            return "Ship hit!";
        };
        missedShots.push(coordinates);
        return "Miss";
    };
    let allSunk = false;
    const checkIfAllShipsSunk = function checkIfAllShipsSunk(){
        if(shipsOnBoard.every((element) => element.sunk === "sunk")){
            allSunk = true;
            return "All ships sunk";
        };
    };
    return { board, placeShip, receiveAttack, checkIfAllShipsSunk }
};

export default gameboard;