const ship = function createShip(lengthOfShip){
    const length = lengthOfShip;
    const hits = 0;
    const sunk = 'not sunk';
    return {length, hits, sunk};
};

export { ship }