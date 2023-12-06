const player = function player(){
    const checkTurn = function checkTurn(){
        const playerName = document.getElementById('player-name');
        if(this.isTurn){
            playerName.classList.add('isTurn');
        } else if (!this.isTurn){
            playerName.classList.remove('isTurn');
        };
    };
    const board = null;
    const isTurn = true;
    return { board, isTurn, checkTurn }
};

const compPlayer = function computerPlayer(){
    const pastAttacks = [];
    const getRandomCoord = function getRandomCoordinates(){
        const randomNum = function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        };
        const xAxisArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const coordX = xAxisArr[randomNum(1, 9)];
        const coordY = randomNum(1, 10);
        return coordX+coordY;
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
    const board = null;
    const isTurn = false;
    return { compAttack, board, isTurn, checkTurnAndAttack };
};

export { player, compPlayer };