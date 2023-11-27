/* eslint-disable no-undef */
import { ship } from './src/ship';

test('ship factory creates object', () => {
    const myShip = ship(2);
    expect(myShip.length).toEqual(2);
});