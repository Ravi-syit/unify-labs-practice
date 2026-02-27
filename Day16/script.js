// =============================
// Smart Text Formatter Utilities
// =============================

// 1️⃣ Title Case Function
const toTitleCase = (text) => {
  return text
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// 2️⃣ Vowel Counter
const countVowels = (text) => {
  const vowels = "aeiou";
  let count = 0;

  for (let char of text.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
};

// 3️⃣ Secret Message Generator
const generateSecretMessage = (text, bannedWords = ["bad", "secret", "ugly"]) => {
  let result = text;

  bannedWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, "***");
  });

  return result;
};

// 4️⃣ Text Statistics Generator
const generateStatistics = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const characters = text.length;
  const vowels = countVowels(text);
  const readingTime = Math.ceil(words.length / 200); // 200 words per minute avg

  return `
    Words: ${words.length}
    Characters: ${characters}
    Vowels: ${vowels}
    Estimated Reading Time: ${readingTime} minute(s)
  `;
};

// =============================
// UI Handlers
// =============================

const getInputText = () => document.getElementById("userText").value;
const displayResult = (output) => document.getElementById("result").innerText = output;

const handleTitleCase = () => {
  const text = getInputText();
  displayResult(toTitleCase(text));
};

const handleVowelCount = () => {
  const text = getInputText();
  displayResult(`Total Vowels: ${countVowels(text)}`);
};

const handleSecretMessage = () => {
  const text = getInputText();
  displayResult(generateSecretMessage(text));
};

const handleStatistics = () => {
  const text = getInputText();
  displayResult(generateStatistics(text));
};

const clearText = () => {
  document.getElementById("userText").value = "";
  displayResult("");
};