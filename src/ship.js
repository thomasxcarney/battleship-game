const ship = function createShip(lengthOfShip){
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
    return {length, hits, sunk, hit, isSunk};
};

export default ship;