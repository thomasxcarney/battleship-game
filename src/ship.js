const ship = function createShip(lengthOfShip, shipName){
    const name = shipName;
    const length = lengthOfShip;
    const hits = 0;
    const sunk = 'not sunk';
    const isSunk = function isSunk(){
        if(this.hits === this.length){
            this.sunk = 'sunk';
        } return this.sunk;
    };
    const hit = function hit() {
        this.hits+=1;
        this.isSunk();
    };
    return {name, length, hits, sunk, hit, isSunk};
};

export default ship;