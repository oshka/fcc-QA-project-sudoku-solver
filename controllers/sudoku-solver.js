class SudokuSolver {

  validate(puzzleString) {
    var reg = new RegExp('^[1-9.]{81}$');
    return reg.test(puzzleString);
  }

  createBoard(str) {
    return str.split('').reduce(function (rows, key, index) { 
      return (index % 9 == 0 ? rows.push([key]) 
        : rows[rows.length-1].push(key)) && rows;
    }, []);    
  }

  createPuzzleString(board) {
    return board.map(e => e.join('')).join('');
  }

  checkRowPlacement(puzzleString, row, column, value) {
      var board = createBoard(puzzleString,9);
      for (var i = 0; i < 9; i++) {
              if (board[row][i] == value) {
                  return {
                      valid: false,
                      conflict: 'row'
                  }
              }
          }
          return {
              valid: true
          }
  }

  checkColPlacement(puzzleString, row, column, value) {
      var board = createBoard(puzzleString);
      for (var i = 0; i < 9; i++) {
              if (board[i][column] == value) {
                  return {
                      valid: false,
                      conflict: 'column'
                  };
              }
          }

          return {
              valid: true
          };
  }

  checkRegionPlacement(puzzleString, row, column, value) {
     var board = createBoard(puzzleString,9);
      let regionStartRow = parseInt(row / 3) * 3;
          let regionStartCol = parseInt(column / 3) * 3;
          for (let i = regionStartRow; i < regionStartRow + 3; i++) {
              for (let j = regionStartCol; j < regionStartCol + 3; j++) {
                  if (board[i][j] == value) {
                      return {
                          valid: false,
                          conflict: 'region'
                      }
                  }
              }
          }
          return {
              valid: true
          }
  }

solve(puzzleString) {
    var board = this.createBoard(puzzleString,9);
     if(this.sudokuSolver(board)) {
       return this.createPuzzleString(board);
     }
}

isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}


sudokuSolver(data) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == '.') {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(data, i, j, k)) {
                        data[i][j] = `${k}`;
                        if (sodokoSolver(data)) {
                            return true;
                        } else {
                            data[i][j] = '.';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
}
module.exports = SudokuSolver;