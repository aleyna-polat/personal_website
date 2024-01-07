const nameSequence = "POLAT";
const cards = [];
let flippedCards = [];
let score = 0;

function createCards() {
  for (let i = 0; i < nameSequence.length; i++) {
    const card = {
      id: `card${i}`,
      letter: nameSequence[i],
      isFlipped: false,
      isMatched: false,
      imagePath: `card_${nameSequence[i]}.svg`
    };
    cards.push(card);
  }
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function startGame() {
  flippedCards = [];
  score = 0;
  updateScoreDisplay();
  shuffleCards();
  displayInitialCards();
  setTimeout(() => {
    hideInitialCards(); 
    setTimeout(() => {
      displayCards(); 
    }, 2000);
  }, 2000);
}

function displayCards() {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.style.backgroundImage = card.isFlipped || card.isMatched ? `url(${card.imagePath})` : 'url(card_flipped.svg)';
    cardElement.setAttribute('data-letter', card.letter);
    cardElement.addEventListener('click', () => flipCard(cardElement));
    gameBoard.appendChild(cardElement);
  });
}

function hideInitialCards() {
  displayInitialCards(); 
  setTimeout(() => {
    cards.forEach(card => {
      const cardElement = document.querySelector(`[data-letter="${card.letter}"]`);
      cardElement.style.backgroundImage = 'url(card_flipped.svg)'; 
    });
    setTimeout(() => {
      displayCards(); 
    }, 2000); 
  }, 2000); 
}

function displayInitialCards() {
  const gameBoard = document.querySelector('.game-board');
  gameBoard.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.style.backgroundImage = `url(${card.imagePath})`;
    cardElement.setAttribute('data-letter', card.letter);
    gameBoard.appendChild(cardElement);
  });
}

function flipAllCards() {
  cards.forEach(card => {
    card.isFlipped = false;
  });
  displayCards();
}

function flipCard(cardElement) {
  const clickedCard = cards.find(card => card.letter === cardElement.getAttribute('data-letter'));
  if (!clickedCard.isFlipped && flippedCards.length < nameSequence.length) {
    clickedCard.isFlipped = true;
    flippedCards.push(clickedCard);
    displayCards();
    checkMatch();

    if (clickedCard.letter === nameSequence[flippedCards.length - 1]) {
      score += 20;
      updateScoreDisplay();
    }
  }
}

function checkMatch() {
  let match = true;
  flippedCards.forEach((card, index) => {
    if (card.letter !== nameSequence[index]) {
      match = false;
    }
  });

  if (match && flippedCards.length === nameSequence.length) {
    score == 100;
    updateScoreDisplay();
    setTimeout(() => {
      alert('Congratulations! You completed the game.');
      startGame();
    }, 500); 
  } else if (!match) {
    alert("Wrong letter. Game over! Your score is: " + score);
    startGame();
  }
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = score;
}

function resetCards() {
  cards.forEach(card => {
    card.isFlipped = false;
    card.isMatched = false;
  });
}

function startGame() {
  flippedCards = [];
  score = 0;
  updateScoreDisplay();
  shuffleCards();
  resetCards(); 
  displayInitialCards();
  setTimeout(() => {
    hideInitialCards();
    setTimeout(() => {
      displayCards();
    }, 1000);
  }, 1000);
}

function restartGame() {
  score = 0;
  updateScoreDisplay();
  resetCards();
  startGame();
}

function initializeGame() {
  createCards();
  displayInitialCards();
}

window.addEventListener('load', initializeGame);
document.getElementById('restart-game').addEventListener('click', restartGame); 

document.getElementById('start-game').addEventListener('click', function () {
  shuffleCards();
  setTimeout(() => {
    hideInitialCards();
    setTimeout(() => {
      displayCards();
    }, 1000);
  }, 1000);
});