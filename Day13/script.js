// =======================
// CALCULATOR SECTION
// =======================

function calculate() {
  let number1 = Number(document.getElementById("num1").value);
  let number2 = Number(document.getElementById("num2").value);

  let sum = number1 + number2;
  let product = number1 * number2;
  let remainder = number1 % number2;

  const output = `
    <p>Sum: ${sum}</p>
    <p>Product: ${product}</p>
    <p>Remainder: ${remainder}</p>
    <hr>
    <p>Type of number1: ${typeof number1}</p>
    <p>Type of sum: ${typeof sum}</p>
  `;

  document.getElementById("calcResults").innerHTML = output;

  console.log("Sum:", sum);
  console.log("Product:", product);
  console.log("Remainder:", remainder);
  console.log("Type of number1:", typeof number1);
}

// =======================
// MAGIC 8 BALL SECTION
// =======================

function askMagic() {
  const question = document.getElementById("question").value;

  const responses = [
    "Yes, definitely!",
    "No way!",
    "Ask again later.",
    "Absolutely yes!",
    "Very doubtful.",
    "It is certain.",
    "Cannot predict now.",
    "Signs point to yes."
  ];

  let randomIndex = Math.floor(Math.random() * responses.length);
  let answer = responses[randomIndex];

  document.getElementById("magicAnswer").textContent = answer;

  console.log("Question:", question);
  console.log("Magic 8-Ball Answer:", answer);
}
