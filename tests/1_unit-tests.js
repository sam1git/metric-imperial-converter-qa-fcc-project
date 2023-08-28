const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  test('reads whole number input', function() {
    assert.strictEqual(convertHandler.getNum('22km'), 22, 'output should be a number 22');
    assert.strictEqual(convertHandler.getNum('22GaL'), 22, 'output should be a number 22');
    assert.strictEqual(convertHandler.getNum('22lbs'), 22, 'output should be a number 22');
  });

  test('reads decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('2.2km'), 2.2, 'output should be a number 2.2');
  });

  test('reads fractional input', function() {
    assert.strictEqual(convertHandler.getNum('5/2km'), 2.5, 'output should be a number 2.5');
  });

  test('reads fractional input with decimal', function() {
    assert.strictEqual(convertHandler.getNum('10.2/2gal'), 5.1, 'output should be a number 5.1');
    assert.strictEqual(convertHandler.getNum('10/2.5gal'), 4, 'output should be a number 4');
  });

  test('returns an error on a double-fraction', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3gal'), 'invalid', 'output should be string: invalid');
  });

  test('defaults to numerical input 1 when no numerical input', function() {
    assert.strictEqual(convertHandler.getNum('gal'), 1, 'output should be number: 1');
  });

  test('reads each valid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('21gal'), 'gal', 'output should be string: gal');
    assert.strictEqual(convertHandler.getUnit('21GaL'), 'gal', 'output should be string: gal');
    assert.strictEqual(convertHandler.getUnit('21km'), 'km', 'output should be string: km');
    assert.strictEqual(convertHandler.getUnit('21Km'), 'km', 'output should be string: km');
    assert.strictEqual(convertHandler.getUnit('21l'), 'L', 'output should be string: L');
    assert.strictEqual(convertHandler.getUnit('21lbs'), 'lbs', 'output should be string: lbs');
    assert.strictEqual(convertHandler.getUnit('21mi'), 'mi', 'output should be string: mi');
    assert.strictEqual(convertHandler.getUnit('21Kg'), 'kg', 'output should be string: mi');
    assert.strictEqual(convertHandler.getUnit('21kG'), 'kg', 'output should be string: mi');
  });

  test('returns an error on invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('21kGd'), 'invalid', 'ouput should be a string: invalid');
  });

  test('returns valid return unit for each input unit', function() {
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'ouput should be a string: lbs');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'ouput should be a string: kg');
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'ouput should be a string: L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'ouput should be a string: gal');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'ouput should be a string: mi');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'ouput should be a string: km');
  });

  test('returns valid spelled out string for each unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', 'output should be a string: kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'output should be a string: pounds');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', 'output should be a string: miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', 'output should be a string: kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'output should be a string: gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', 'output should be a string: liters');
  });

  test('return return unit lbs for input unit kg', function() {
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'output should be a string: lbs');
  });
  
  test('return return unit kg for input unit lbs', function() {
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'output should be a string: kg');
  });
  
  test('return return unit gal for input unit L', function() {
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'output should be a string: gal');
  });
  
  test('return return unit L for input unit gal', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'output should be a string: L');
  });
  
  test('return return unit mi for input unit km', function() {
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'output should be a string: mi');
  });
  
  test('return return unit km for input unit mi', function() {
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'output should be a string: km');
  });
  
});