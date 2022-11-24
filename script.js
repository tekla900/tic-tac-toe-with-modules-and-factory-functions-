const Player = (name) => {
  const getName  = () => name;
  
  const countScore = (arr, sign) => {
    let counter = 0;

    arr.forEach(each => {
        if (each == sign) {
            counter++;
        };
    });
    return counter;
  };

  return {getName, countScore};
};
  
  
const Gameboard = (() => {
  const player1 = Player(document.querySelector('#user-1').value);
  const player2 = Player(document.querySelector('#user-2').value);

  let boardArray = ['', '', '', '', '', '', '', '', ''];
  let board = document.querySelector('.board');
  let squares = document.querySelectorAll('.square');

  let whoseTurn = 0;
  let winner;
  let winnerCount = [];
  let winnerAlert = document.querySelector('.winnerSec');
  
  let xScore = document.querySelector('.x-score');
  let oScore = document.querySelector('.o-score');

  // buttons 
  let startBtn = document.querySelector('.start');
  let restartBtn = document.querySelector('.restart');

  const restartBoard= () => {
    squares.forEach(square => {
        square.textContent = '';
    });
      
    for (let i in boardArray) {
        boardArray[i] = '';
    };
  
    whoseTurn = 0;
  };

  const restartGame = () => {
    restartBoard();

    xScore.textContent = '0';
    oScore.textContent = '0';
  
    winnerCount = [];
    winner = '';
  
    board.style.display = 'grid';
    winnerAlert.style.display = 'none';
  };

  const checkIfBoardIsFull = () => {
    let narr = boardArray.filter(each => each != '');
    return narr.length == board.length;
  };

  function checkForWinningCombinations(player, board) {
    if ((board[0] === player && board[1] === player && board[2] === player)
        || ((board[3] === player && board[4] === player && board[5] === player))
        || ((board[6] === player && board[7] === player && board[8] === player))
        || ((board[0] === player && board[3] === player && board[6] === player))
        || ((board[1] === player && board[4] === player && board[7] === player))
        || ((board[2] === player && board[5] === player && board[8] === player))
        || ((board[0] === player && board[4] === player && board[8] === player))
        || ((board[2] === player && board[4] === player && board[6] === player))
    ) {
        return true;
    }
    return false;
  };

  function checkWinner() {
    if(checkForWinningCombinations('X', boardArray)){
      restartBoard();
      xScore.textContent = Number(xScore.textContent) + 1;
      winner = 'X';
      winnerCount.push('X');

      if(player1.countScore(winnerCount, 'X') >= 3) {
          stopTheGame('X');
      };
    } else if (checkForWinningCombinations('O', boardArray)) {
      restartBoard();
      oScore.textContent = Number(oScore.textContent) + 1;
      winner = 'O';
      winnerCount.push('O');

      if(player2.countScore(winnerCount, 'O') >= 3) {
          stopTheGame('O');
      };
    } else if(whoseTurn!=0 && checkIfBoardIsFull(boardArray)) {
        restartBoard();
    }
  };

  function stopTheGame(sign) {
      let winnerh3 = document.querySelector('.winner');

      winnerAlert.style.display = 'flex';
      board.style.display = 'none';

      winnerh3.textContent = `${sign} is the winner`
  };

  function markSquare(target, board) {
    let index = target.dataset.index;
    
    if (whoseTurn % 2 == 0) {  
        board[index] = 'X';
        target.textContent = 'X';
        target.fontWeight = 'bold';
        target.style.color = '#31C3BD';
    } else {      
        board[index] = 'O';
        target.textContent = 'O';
        target.fontWeight = 'bold';
        target.style.color = '#F2B137';
    }
    whoseTurn += 1;
  };

  function startGame() {
    let usersSec = document.querySelector('.user-names-input');
    let score = document.querySelector('.score');
    let playerName1 = document.getElementById('player-1');
    let playerName2 = document.getElementById('player-2');

    usersSec.style.display = 'none';
    board.style.display = 'grid';
    score.style.display = 'flex';

    playerName1.textContent = player1.getName();
    playerName2.textContent = player2.getName();
  };

  // event listeners

  startBtn.addEventListener('click', () => {
    startGame();
  });

  squares.forEach(square => {
      square.addEventListener('click', () => {
          if (square.textContent == '') {
            markSquare(square, boardArray);
            checkWinner();
          }; 
      });
  });

  restartBtn.addEventListener('click',() => {
      restartGame();
  });
})();
