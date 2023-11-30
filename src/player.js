const player = function player(){
    const attack = function attack(coord){
        return coord;
    };
    return { attack }
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
    return { compAttack };
};

export { player, compPlayer };