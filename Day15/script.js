// ================= GLOBAL STATE =================

const output = document.getElementById("output");
const input = document.getElementById("commandInput");
const clock = document.getElementById("clock");
let currentMode = "normal";

let balance = parseFloat(localStorage.getItem("balance")) || 1000;
let loggedIn = false;
let attempts = 3;
const MASTER_PIN = "4444";
const secretWord = "frost";

let history = [];
let historyIndex = -1;

let currentDirectory = "/";
const fileSystem = {
    "/": ["about.txt", "projects.txt", "vault.key"],
};

// ================= UTILITIES =================

function print(text) {
    output.innerHTML += text + "\n";
    output.scrollTop = output.scrollHeight;
}

function typeWriter(text, speed = 30) {
    let i = 0;
    let interval = setInterval(() => {
        if (i < text.length) {
            output.innerHTML += text.charAt(i);
            i++;
        } else {
            output.innerHTML += "\n";
            clearInterval(interval);
        }
    }, speed);
}

// ================= CLOCK =================

setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString();
}, 1000);

// ================= MATRIX BACKGROUND =================

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01CRYOCORE";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffff";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    });
}

setInterval(drawMatrix, 35);

// ================= BOOT =================

function typeLine(text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        let interval = setInterval(() => {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                output.innerHTML += "\n";
                resolve();
            }
        }, speed);
    });
}

async function bootSequence() {
    await typeLine("Booting CryoCore OS v3...");
    await typeLine("Loading encrypted memory...");
    await typeLine("System Ready.");
    await typeLine("ENTER MASTER ACCESS CODE:");
}

bootSequence();

// ================= INPUT HANDLER =================

input.addEventListener("keydown", function (e) {

    if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
        return;
    }

    if (e.key === "ArrowDown") {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        }
        return;
    }

    if (e.key === "Enter") {

        const cmd = input.value.trim();
        history.push(cmd);
        historyIndex = history.length;

        input.value = "";

        if (!loggedIn) {
            handleLogin(cmd);
        }
        else if (currentMode === "shop") {
            handleShopQuantity(cmd);
        }
        else {
            handleCommand(cmd);
        }
    }
});

// ================= LOGIN =================

function handleLogin(code) {
    if (code === MASTER_PIN) {
        loggedIn = true;
        print("ACCESS GRANTED\n");
        showHelp();
    } else {
        attempts--;
        print("ACCESS DENIED - Attempts left: " + attempts);
        if (attempts === 0) {
            print("SYSTEM LOCKDOWN");
            input.disabled = true;
        }
    }
}

// ================= COMMAND SYSTEM =================

function handleCommand(cmd) {
    const parts = cmd.split(" ");
    const base = parts[0];

    switch (base) {

        case "help":
            showHelp();
            break;

        case "bank":
            print("Balance: $" + balance.toFixed(2));
            break;

        case "deposit":
            updateBalance(parts[1], true);
            break;

        case "withdraw":
            updateBalance(parts[1], false);
            break;

        case "shop":
            print("=== SMART SHOP ===");
            print("Unit Price: $50");
            print("Enter quantity:");
            currentMode = "shop";
            break;

        case "ls":
            print(fileSystem[currentDirectory].join("  "));
            break;

        case "cd":
            if (parts[1] === "/") currentDirectory = "/";
            print("Directory: " + currentDirectory);
            break;

        case "cat":
            openFile(parts[1]);
            break;

        case "unlock":
            if (parts[1] === secretWord) {
                print("VAULT UNLOCKED 🔓");
                print("Secret Portfolio Link: https://yourportfolio.com");
            } else {
                print("Incorrect key.");
            }
            break;

        case "exit":
            print("Shutting down...");
            input.disabled = true;
            break;

        default:
            print("Unknown command. Type help.");
    }
}

function updateBalance(amount, isDeposit) {
    let num = parseFloat(amount);

    if (isNaN(num) || num <= 0) {
        print("Invalid amount.");
        return;
    }

    if (!isDeposit && num > balance) {
        print("Insufficient funds.");
        return;
    }

    balance = isDeposit ? balance + num : balance - num;
    localStorage.setItem("balance", balance);

    print("Updated Balance: $" + balance.toFixed(2));
}

function openFile(file) {
    switch (file) {
        case "about.txt":
            print("CryoCore OS - Advanced JS Terminal Simulation");
            break;
        case "projects.txt":
            print("Virtual Core, AI Tools, Web Apps");
            break;
        case "vault.key":
            print("Hint: Opposite of heat.");
            break;
        default:
            print("File not found.");
    }
}

function showHelp() {
    print("\nAvailable Commands:");
    print("help");
    print("bank");
    print("deposit <amount>");
    print("withdraw <amount>");
    print("shop");
    print("ls");
    print("cd /");
    print("cat <file>");
    print("unlock <key>");
    print("exit\n");
}
function openShop() {
    print("=== SMART SHOP ===");
    print("Unit Price: $50");
    print("Enter quantity:");

    input.disabled = false;

    const quantityHandler = function (e) {
        if (e.key === "Enter") {

            let quantity = parseInt(input.value.trim());
            input.value = "";

            input.removeEventListener("keydown", quantityHandler);

            if (isNaN(quantity) || quantity <= 0) {
                print("Invalid quantity.");
                return;
            }

            const UNIT_PRICE = 50;
            let discount = 0;

            // Nested if/else if chain
            if (quantity <= 5) {
                discount = 0;
            }
            else if (quantity <= 10) {
                discount = 0.10;
            }
            else {
                discount = 0.20;
            }

            let total = quantity * UNIT_PRICE;
            let finalPrice = total - (total * discount);

            print("Quantity: " + quantity);
            print("Discount: " + (discount * 100) + "%");
            print("Final Price: $" + finalPrice.toFixed(2));

            if (finalPrice > balance) {
                print("INSUFFICIENT FUNDS.");
            } else {
                balance -= finalPrice;
                localStorage.setItem("balance", balance);
                print("Purchase Successful!");
                print("New Balance: $" + balance.toFixed(2));
            }
        }
    };

    input.addEventListener("keydown", quantityHandler);
}
function handleShopQuantity(inputValue) {

    let quantity = parseInt(inputValue);

    if (isNaN(quantity) || quantity <= 0) {
        print("Invalid quantity.");
        currentMode = "normal";
        return;
    }

    const UNIT_PRICE = 50;
    let discount = 0;

    if (quantity <= 5) {
        discount = 0;
    } 
    else if (quantity <= 10) {
        discount = 0.10;
    } 
    else {
        discount = 0.20;
    }

    let total = quantity * UNIT_PRICE;
    let finalPrice = total - (total * discount);

    print("Quantity: " + quantity);
    print("Discount: " + (discount * 100) + "%");
    print("Final Price: $" + finalPrice.toFixed(2));

    if (finalPrice > balance) {
        print("INSUFFICIENT FUNDS.");
    } else {
        balance -= finalPrice;
        localStorage.setItem("balance", balance);
        print("Purchase Successful!");
        print("New Balance: $" + balance.toFixed(2));
    }

    currentMode = "normal";
}