 const newGame = document.querySelector('.game'),
     player1Score = document.querySelector('.Player1score'),
     player2Score = document.querySelector('.Player2score'),
     roll = document.querySelector('.roll'),
     hold = document.querySelector('.hold'),
     player1Current = document.querySelector('.Player1scoreChange'),
     player2Current = document.querySelector('.Player2scoreChange'),
     rollNumber = document.querySelector('.rollNumber'),
     player1Red = document.querySelector('.player1Red'),
     player2Red = document.querySelector('.player2Red'),
     setButton = document.querySelector('.set'),
     winningInput = document.querySelector('input');


 var value = 0,
     turn = true,
     scoreBoard = [
         { player: 'player1', score: 0 },
         { player: 'player2', score: 0 }
     ],
     currentBoard = [
         { player: 'player1', score: 0 },
         { player: 'player2', score: 0 }
     ],
     rollingaDiceNumber = 0,
     winningScore = 100


 function getReady() {
     checkturn()
 }



 function checkturn() {
     if (turn) {
         checkturnHelper(player2Red, player1Red)
     } else {
         checkturnHelper(player1Red, player2Red)
     }
 }

 function checkturnHelper(dx, dy) {
     dx.innerHTML = ''
     dy.innerHTML = 'on'
 }


 function endTurn() {
     rollingaDiceNumber = 0;
     rollNumber.innerHTML = '';
     player1Current.innerHTML = 0;
     player2Current.innerHTML = 0;
     value = 0;
     turn = !turn;
     checkturn();
 }

 function numberCheck(number) {
     if (number === 1) {
         if (turn) {
             currentBoard[0].score = 0;
             player1Current.innerHTML = currentBoard[0].score;
             endTurn()
         } else {
             currentBoard[1].score = 0;
             player2Current.innerHTML = currentBoard[0].score;
             endTurn()
         }
     } else {
         if (turn) {
             value += number;
             player1Current.innerHTML = value;
             currentBoard[0].score = value;
         } else {
             value += number;
             player2Current.innerHTML = value;
             currentBoard[1].score = value;
         }
     }
 }

 function rolling(random) {
     //show it on the screen
     rollNumber.innerHTML = random;
     rollingaDiceNumber++;
     //number check to see whether or not it is 1
     numberCheck(random);
 }

 function holdandAdd() {
     if (turn) {
         holdadAddHelper(0, player1Score)
     } else {
         holdadAddHelper(1, player2Score)
     }
 }

 function holdadAddHelper(num, player) {
     let score = currentBoard[num].score;
     scoreBoard[num].score += score;
     player.innerHTML = scoreBoard[num].score;
     endTurn();
 }


 function winnerCheck() {
     scoreBoard.forEach(value => {
         if (value.score >= winningScore) {
             if (value.player === 'player1') {
                 alert('player1 won!!!')
             } else {
                 alert('player2 won!!!')
             }
         } else {
             return;
         }
     })
 }



 //event listener 
 //roll a dice
 roll.addEventListener('click', e => {
         e.preventDefault();
         let random = Math.floor(Math.random() * 6 + 1);
         rolling(random)
     })
     //hold and add number
 hold.addEventListener('click', e => {
     e.preventDefault();
     if (rollingaDiceNumber === 0) {
         return;
     } else {
         holdandAdd();
         winnerCheck()
     }
 })

 setButton.addEventListener('click', e => {
     e.preventDefault();
     let newWinningScore = Number(winningInput.value);
     if (isNaN(newWinningScore)) {
         winningScore = 100;
     } else {
         winningScore = newWinningScore
     }
 })


 //window loading
 window.onload = getReady;