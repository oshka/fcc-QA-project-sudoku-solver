const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    //https://github.com/freeCodeCamp/freeCodeCamp/blob/main/curriculum/challenges/english/06-quality-assurance/quality-assurance-projects/sudoku-solver.md
  test('Logic handles a valid puzzle string of 81 characters', function(done) {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.equal(solver.validate(puzzleString),true);
    done();
  });
});
