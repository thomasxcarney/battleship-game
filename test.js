/* eslint-disable no-undef */
import { ship } from './src/ship';

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