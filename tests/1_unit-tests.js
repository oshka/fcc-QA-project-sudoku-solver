const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function(done) {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let parsed = solver.validate(puzzleString);
    assert.equal(parsed,true);
    done();
  });
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
    let puzzleString = 'abc..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let output = 'Invalid characters in puzzle';
    let parsed = solver.validate(puzzleString);
    assert.property(parsed,'error');
    assert.equal(parsed.error,output);
    done();
  });
  test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
    let puzzleString = '2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let output = 'Expected puzzle to be 81 characters long';
    let parsed = solver.validate(puzzleString);
    assert.property(parsed,'error');
    assert.equal(parsed.error,output);
    done();
  });
   test('Logic handles a valid row placement', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 0,
        column =0,
        value = 7;
    let output = true;
    let parsed = solver.checkRowPlacement(puzzleString, row, column, value);
    assert.equal(parsed,output);
    done();
  });
  test('Logic handles an invalid row placement', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 0,
        column = 0,
        value = 1;
    let output = false;
    let parsed = solver.checkRowPlacement(puzzleString, row, column, value);
    assert.equal(parsed,output);
    done();
  });
   test('Logic handles a valid column placement', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 0,
        column = 0,
        value = 7;
    let output = true;
    let parsed = solver.checkColPlacement(puzzleString, row, column, value);
    assert.equal(parsed,output);
    done();
  });
  test('Logic handles an invalid column placement', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 0,
        column = 0,
        value = 4;
    let output = false;
    let parsed = solver.checkColPlacement(puzzleString, row, column, value);
    assert.equal(parsed,output);
    done();
  });
 test('Logic handles a valid region (3x3 grid) placement', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 0,
        column = 0,
        value = 7;
    let output = true;
    let parsed = solver.checkRegionPlacement(puzzleString, row, column, value);
    assert.equal(parsed,output);
    done();
  });
  test('Logic handles an invalid region (3x3 grid) placement', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 0,
        column = 0,
        value = 2;
    let output = false;
    let parsed = solver.checkRegionPlacement(puzzleString, row, column, value);   
    assert.equal(parsed,output);
    done();
  });
  test('Valid puzzle strings pass the solver', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
     let output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    let parsed = solver.solve(puzzleString);
    assert.property(parsed,'solution');
    assert.equal(parsed.solution,output);
    done();
  });
test('Invalid puzzle strings fail the solver', function(done) {
    let puzzleString = 'AA..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let output = 'Expected puzzle to be 81 characters long';
    let parsed = solver.solve(puzzleString);
    console.log(parsed);
    assert.property(parsed,'error');
    assert.equal(parsed.error,output);
    done();
  });
  test('Solver returns the expected solution for an incomplete puzzle', function(done) {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
     let output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    let parsed = solver.solve(puzzleString);
    assert.property(parsed,'solution');
    assert.equal(parsed.solution,output);
    done();
  });
});