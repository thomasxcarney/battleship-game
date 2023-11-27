const ship = function createShip(lengthOfShip){
    const length = lengthOfShip;
    const hits = 0;
    const sunk = 'not sunk';
    const hit = function hit() {
        this.hits+=1; 
    };
    const isSunk = function isSunk(){
        if(this.hits >= this.length){
            this.sunk = 'sunk';
        };
        return this.sunk;
    };
    return {length, hits, sunk, hit, isSunk};
};

export default ship;