const player = function player(){
    const checkTurn = function checkTurn(){
        const playerName = document.getElementById('player-name');
        if(this.isTurn){
            playerName.classList.add('isTurn');
        } else if (!this.isTurn){
            playerName.classList.remove('isTurn');
        };
    };

    const placePlayerShips = function placePlayerShips(){
        const shipsArr=this.board.shipsToPlace;
        shipsArr.forEach((element) => {
            const coordinates = prompt(`Enter coordinates to place ${  element.name} (${ element.length} cells long) format A1 A5`);
            const coordinatesArr = coordinates.split(' ');
            this.board.placeShip(`${ element.length}`, coordinatesArr[0], coordinatesArr[1]);
        });
    };

    const board = null;
    const isTurn = true;
    return { board, isTurn, checkTurn, placePlayerShips }
};

const compPlayer = function computerPlayer(){
    const pastAttacks = [];
    const yAxisArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    const getRandomCoord = function getRandomCoordinates(){
        const randomNum = function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        };
        const coordY = yAxisArr[randomNum(1, 9)];
        const coordX = randomNum(1, 10);
        return coordY+coordX;
    };

    const compAttack = function computerAttack(board){
        const possibleMoves = board.filter((element) => !pastAttacks.includes(element.name));
        let attack = getRandomCoord();

        const checkIfAttackIsValid = function checkIfAttackIsValid(attackCoord){
            const attackValid = possibleMoves.find((e) => e.name === attackCoord);
            if (!attackValid) {
                attack = getRandomCoord();
                checkIfAttackIsValid(attack);
            } return attackCoord;
        };

        return checkIfAttackIsValid(attack);
    };

    const checkTurnAndAttack = function checkTurnAndAttack(boardToAttack){
        const computerName = document.getElementById('computer-name');
        if(this.isTurn){
            computerName.classList.add('isTurn');
            const computerAttackCoord = this.compAttack(boardToAttack);
            const compAttackGridSquare = document.getElementById(`player1 ${  computerAttackCoord}`);
            setTimeout(() => {compAttackGridSquare.click();}, 3000);
        } else if (!this.isTurn){
            computerName.classList.remove('isTurn');
        };
    };

    const placeComputerShips = function placeComputerShips(){
        const shipsArr=this.board.shipsToPlace;
        const {board} = this;
        console.log(shipsArr);

        const isSpaceFree = function checkIfSpaceIsFree(coordinates){
            const coordIndex = board.boardArr.findIndex(element => element.name === coordinates);
            const cellObj = board.boardArr[coordIndex];
            if(cellObj.shipOnSpace === null){
                return true;
            } return false;
        };

        const placeShip = function placeShip(shipToPlace){
            let startCoord = getRandomCoord();
            if(document.getElementById(`computerPlayer ${  startCoord}`).classList.contains('hasShip')){
                startCoord = getRandomCoord();
            };
            const shipLength = shipToPlace.length;
            const horizontalOrVertical = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            if(horizontalOrVertical === 'horizontal'){
                const startingX = Number(startCoord.split('')[1]);
                const endingX = startingX + (shipToPlace.length - 1);
                if(endingX > 10){ 
                    placeShip(shipToPlace);
                } else if(endingX <= 10){
                    const endCoord = (startCoord.split('')[0]).concat(endingX);
                    for(let i = 0; i < (shipToPlace.length-1); i++){
                        if(!isSpaceFree(startCoord.split('')[0].concat(Number(startCoord.split('')[1]) + i))){
                            return placeShip(shipToPlace);
                        };
                    }; 
                    const shipPlacementArr = [shipLength, startCoord, endCoord];
                    return board.placeShip(shipPlacementArr[0], shipPlacementArr[1], shipPlacementArr[2]);
                };
            } if (horizontalOrVertical === 'vertical'){
                const startY = startCoord.split('')[0];
                const startX = startCoord.split('')[1];
                const startYIndex = yAxisArr.indexOf(startY);
                const endCoordYIndex = startYIndex + (shipLength-1);
                if(endCoordYIndex > 9){ 
                    placeShip(shipToPlace);
                } else if(endCoordYIndex <= 9){
                    for(let i = 0; i < (shipLength-1); i++){
                        const yValueIndex = (startYIndex + i);
                        const yValue = yAxisArr[yValueIndex];
                        const coordinates = yValue.concat(startX);
                        if(!isSpaceFree(coordinates)){
                            return placeShip(shipToPlace);
                        };
                    };
                    const shipPlacementArr = [shipLength, startCoord, yAxisArr[endCoordYIndex].concat(startX)];
                    return board.placeShip(shipPlacementArr[0], shipPlacementArr[1], shipPlacementArr[2])
                };
            };
        };

        shipsArr.forEach((element) => {
            placeShip(element);
        });
    };

    const board = null;
    const isTurn = false;
    return { compAttack, board, isTurn, checkTurnAndAttack, placeComputerShips };
};

export { player, compPlayer };