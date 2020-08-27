let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;


// Write your code below:
generateTarget = () => {
  return Math.floor(Math.random() * 10);
};

compareGuesses = (myGuess, aiGuess, target) => {
  if ((Math.abs(target - myGuess)) < (Math.abs(target - aiGuess))) {
    return true;
  } else if ((Math.abs(target - myGuess)) > (Math.abs(target - aiGuess))) {
    return false;
  } else {
    return true;
  };
};

updateScore = winner => {
  if (winner === 'human') {
    humanScore++;
  } else if (winner === 'computer') {
    computerScore++;
  };
};

advanceRound = () => {
  currentRoundNumber++;
};
