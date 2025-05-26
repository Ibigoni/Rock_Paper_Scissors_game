let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}; 

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}
  */

let isAutoPlaying = false; //flag statement (boolean)
let intervalId;

// const autoPlay = () => {

// };

document.querySelector('.js-autoplay-button')
.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay();
  }
});
function autoPlay() {//This is better because it enables hoisting.
  const buttonElement = document.querySelector('.js-stop-button');
  // if (buttonElement.innerText === 'Auto Play') {
  //   buttonElement.innerHTML = 'Stop';
  // } else {
  //   buttonElement.innerHTML = 'Auto Play';
  // }

  if (!isAutoPlaying && buttonElement.innerText === 'Auto Play') {
    buttonElement.innerHTML = 'Stop Playing';
     intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000); //setInterval returns a number like an Id but it is different everytime it runs
    isAutoPlaying = true;
  } else {
    buttonElement.innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {//event param contains the key pressed
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();


  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  }else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  
  document.querySelector('.js-result')
  .innerHTML = result;
  
  document.querySelector('.js-moves')
  .innerHTML = `You
<img src="images/${playerMove}-emoji.png" 
class="move-icon">
<img src="images/${computerMove}-emoji.png" 
class="move-icon">
Computer`;
}

const confirmMessage = 'Are you sure you want to reset the socre?';
const html = 
`
<p>${confirmMessage} 
  <button class="js-check-button">Yes</button>
  <button class="js-no-button">No</button>
</p>
`;



document.querySelector('.js-resetscore-button')
.addEventListener('click', () => {
  document.querySelector('.js-confirm-text-button')
  .innerHTML = html;
  
  const yesButton = document.querySelector('.js-check-button');
  const noButton = document.querySelector('.js-no-button');

  //Use .addEventListener to check if the button has been clicked
    yesButton.addEventListener('click', () => {
      if (yesButton.innerText === 'Yes'){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-confirm-text-button').innerHTML = '';
      }
    });
    
    noButton.addEventListener('click', () => {
      if (noButton.innerText === 'No'){
        document.querySelector('.js-confirm-text-button').innerHTML = '';
      }
    });


});


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    document.querySelector('.js-confirm-text-button')
  .innerHTML = html;
  
  const yesButton = document.querySelector('.js-check-button');
  const noButton = document.querySelector('.js-no-button');

  //Use .addEventListener to check if the button has been clicked
    yesButton.addEventListener('click', () => {
      if (yesButton.innerText === 'Yes'){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-confirm-text-button').innerHTML = '';
      }
    });
  
    noButton.addEventListener('click', () => {
      if (noButton.innerText === 'No'){
        document.querySelector('.js-confirm-text-button').innerHTML = '';
      }
    });
  }
});



function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Win: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';


  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock'; 
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

    return computerMove; 
  }

  