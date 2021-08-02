'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      var regDigitsOnly = new RegExp('^[1-9]{1}$');
      var regCoordinates = new RegExp('^[A-Ia-i]{1}[1-9]{1}$'); 
      var validJsonString = JSON.stringify({ valid: true});      
      var letter_to_digit = {'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9};
      var req_value =  req.body.value,
           req_coordinate = req.body.coordinate,
           puzzleString= req.body.req_puzzle;
    
      if(req.body.coordinate==""||req.body.value=="") {
        res.json({ "error": "Required field(s) missing" })
      }
       if(!regDigitsOnly.test(req.body.value)) {
        res.json({ "error": "Invalid value" })    
      } 
       if(!regCoordinates.test(req.body.coordinate)) {
        res.json({ "error": "Invalid coordinate" })    
      } 
      var row=req_coordinate.split("")[0].toUpperCase();
      var column = req_coordinate.split("")[1]; 
      if(JSON.stringify(solver.checkRowPlacement(puzzleString, row, column, req_value))!=validJsonString) {
          res.json(solver.checkRowPlacement(puzzleString, row, column, req_value));   
      } else if(JSON.stringify(solver.checkColPlacement(puzzleString, row, column, req_value))!=validJsonString) {
          res.json(solver.checkColPlacement(puzzleString, row, column, req_value));   
      } else if(JSON.stringify(solver.checkRegionPlacement(puzzleString, row, column, req_value))!=validJsonString) {
          res.json(solver.checkRegionPlacement(puzzleString, row, column, req_value));   
      } else {
        res.json({ "valid": true }) 
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
        var puzzle = req.body.puzzle;
        res.json({ "solution": solver.solve(puzzle) })
    });
};