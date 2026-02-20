let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const attemptsLeft = document.getElementById("attemptsLeft");
const restartBtn = document.getElementById("restartBtn");

attemptsLeft.textContent = `Attempts left: ${attempts}`;

submitBtn.addEventListener("click", function() {
    let userGuess = Number(guessInput.value);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.textContent = "⚠ Please enter a valid number (1-100)";
        return;
    }

    attempts--;

    if (userGuess === randomNumber) {
        message.textContent = "🎉 Correct! You guessed the number!";
        endGame();
    } else if (userGuess > randomNumber) {
        message.textContent = "📉 Too High!";
    } else {
        message.textContent = "📈 Too Low!";
    }

    attemptsLeft.textContent = `Attempts left: ${attempts}`;

    if (attempts === 0 && userGuess !== randomNumber) {
        message.textContent = `💀 Game Over! The number was ${randomNumber}`;
        endGame();
    }

    guessInput.value = "";
});

function endGame() {
    guessInput.disabled = true;
    submitBtn.disabled = true;
    restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    attemptsLeft.textContent = `Attempts left: ${attempts}`;
    message.textContent = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    restartBtn.classList.add("hidden");
});