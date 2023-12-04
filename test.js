/* eslint-disable no-undef */
import ship from './src/ship';
import gameboard from './src/gameboard';
import { player, compPlayer } from './src/player';

describe('ship factory tests', () => {
    test('ship factory creates object', () => {
        const myShip = ship(2);
        expect(myShip.length).toEqual(2);
    });

    test('ship hit function adds hits to object', () => {
        const myShip = ship();
        myShip.hit();
        expect(myShip.hits).toEqual(1);
    });

    test('ship isSunk function calculates if ship is sunk based on length', () => {
        const myShip = ship(1);
        myShip.hit();
        expect(myShip.isSunk()).toEqual("sunk");
    });
});

describe('gameboard factory tests', () => {
    test('gameboard creates array of spaces on board', () => {
        const myGameboard = gameboard();
        expect(myGameboard.boardArr[0].name).toBe('A1');
        expect(myGameboard.boardArr[99].name).toBe('J10');
    });

    test('gameboard places ships at coordinates', () => {
        const myGameboard = gameboard();
        myGameboard.placeShip(2, 'A1', 'B1');
        expect(myGameboard.boardArr[0].shipOnSpace).toBeInstanceOf(Object);
        expect(myGameboard.boardArr[10].shipOnSpace).toBeInstanceOf(Object);
    });

    test('placing ships marks all spaces in between coordinates as occupied by ship', () => {
        const myGameboard = gameboard();
        myGameboard.placeShip(2, 'A1', 'A3');
        expect(myGameboard.boardArr[1].shipOnSpace).toBeInstanceOf(Object);
    });

    test('receiveAttack function takes coordinates and checks if attack hit ship', () => {
        const myGameboard = gameboard();
        myGameboard.placeShip(2, 'A1', 'B1');
        expect(myGameboard.receiveAttack('A1')).toBe('Ship hit!');
        expect(myGameboard.receiveAttack('A2')).toBe('Miss');
    });

    test('checkIfAllShipsSunk checks if all ships on gameboard have sunk', () => {
        const myGameboard = gameboard();
        myGameboard.placeShip(2, 'A1', 'B1');
        myGameboard.receiveAttack('A1');
        myGameboard.receiveAttack('B1');
        expect(myGameboard.receiveAttack('A2')).toBe('Miss');
    });
});

describe('player factory tests', () => {
    test('computer player attack returns random coordinates', () => {
        const myGameboard = gameboard();
        const myComputer = compPlayer();
        expect(myComputer.compAttack(myGameboard.boardArr)).toMatch(/^[A-J][1-9]|10$/
        );
    });
});