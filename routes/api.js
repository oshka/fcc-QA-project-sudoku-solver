'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      var regDigitsOnly = new RegExp('^[1-9]{1}$');
      var regCoordinates = new RegExp('^[A-Ia-i]{1}[1-9]{1}$'); 
      var validJsonString = JSON.stringify({ valid: true});      
      //var letter_to_digit = {'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9};
            var letter_to_digit = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8};
      var req_value =  req.body.value,
           req_coordinate = req.body.coordinate,
           puzzleString= req.body.puzzle;
    

      if(!req.body.hasOwnProperty('puzzle') ||!req.body.hasOwnProperty('coordinate') ||!req.body.hasOwnProperty('value')) {
         res.json({ "error": "Required field(s) missing" })
        }
       if(!regDigitsOnly.test(req.body.value)) {
        res.json({ "error": "Invalid value" })    
      } 
       if(!regCoordinates.test(req.body.coordinate)) {
        res.json({ "error": "Invalid coordinate" })    
      } 
      //puzzle validating
      if(solver.validate(puzzleString) != true) {
          res.json( solver.validate(puzzleString));
      }
      var row = letter_to_digit[req_coordinate.split("")[0].toUpperCase()];
      var column = req_coordinate.split("")[1]-1;

      if (solver.checkRowPlacement(puzzleString, row, column, req_value)==false && solver.checkColPlacement(puzzleString, row, column, req_value)==false && solver.checkRegionPlacement(puzzleString, row, column, req_value)==false) {
         res.json({ "valid": false, "conflict": [ "row", "column", "region" ] });
      } else if (solver.checkRowPlacement(puzzleString, row, column, req_value)==false && solver.checkColPlacement(puzzleString, row, column, req_value)==false) {
          res.json({ "valid": false, "conflict": [ "row", "column" ] });   
      } else if(solver.checkRowPlacement(puzzleString, row, column, req_value)==false) {
          res.json({ "valid": false, "conflict": [ "row" ] }); 
      } else if(solver.checkColPlacement(puzzleString, row, column, req_value)==false) {
           res.json({ "valid": false, "conflict": [ "column" ] }); 
       } else if(solver.checkRegionPlacement(puzzleString, row, column, req_value)==false) {
           res.json({ "valid": false, "conflict": [ "region" ] });   
      } else {
        res.json({ "valid": true }) 
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
        if(!req.body.hasOwnProperty('puzzle')) {
          res.json( { error: 'Required field missing' } );
        }
        var puzzle = req.body.puzzle;   
        res.json( solver.solve(puzzle) );
    });
};