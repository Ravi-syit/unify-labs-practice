class Pet {
    constructor(name, type, health = 100, hunger = 50, energy = 50) {
        this.name = name;
        this.type = type;

        this._health = health;
        this.hunger = hunger;
        this.energy = energy;
    }

    // ==========================
    // GETTER & SETTER (Health)
    // ==========================
    get health() {
        return this._health;
    }

    set health(value) {
        if (value > 100) this._health = 100;
        else if (value < 0) this._health = 0;
        else this._health = value;
    }

    // ==========================
    // MOOD SYSTEM
    // ==========================
    get mood() {
        if (this.health < 30) return "😷 Sick";
        if (this.hunger > 70 || this.energy < 30) return "😢 Sad";
        return "😊 Happy";
    }

    // ==========================
    // ACTION METHODS
    // ==========================
    feed() {
        this.hunger -= 20;
        this.energy += 5;
        this.health += 8;
        this.normalize();
    }

    play() {
        if (this.energy <= 10) return; // too tired
        this.energy -= 20;
        this.hunger += 15;
        this.health += 5;
        this.normalize();
    }

    // ==========================
    // AUTO DECAY SYSTEM
    // ==========================
    decay() {
        this.hunger += 5;
        this.energy -= 5;
        this.health -= 3;
        this.normalize();
    }

    normalize() {
        this.hunger = Math.min(Math.max(this.hunger, 0), 100);
        this.energy = Math.min(Math.max(this.energy, 0), 100);
        this.health = this._health; // triggers setter
    }

    getStatus() {
        return `
Name: ${this.name}
Type: ${this.type}
Health: ${this.health}
Hunger: ${this.hunger}
Energy: ${this.energy}
Mood: ${this.mood}
        `;
    }

    // ==========================
    // SAVE & LOAD SYSTEM
    // ==========================
    save() {
        localStorage.setItem("digitalPet", JSON.stringify({
            name: this.name,
            type: this.type,
            health: this.health,
            hunger: this.hunger,
            energy: this.energy
        }));
    }

    static load() {
        const data = JSON.parse(localStorage.getItem("digitalPet"));
        if (data) {
            return new Pet(
                data.name,
                data.type,
                data.health,
                data.hunger,
                data.energy
            );
        }
        return null;
    }
}

// ==========================
// LOAD PET OR CREATE NEW
// ==========================
let myPet = Pet.load() || new Pet("Buddy", "Dog");

// ==========================
// UI UPDATE
// ==========================
function updateUI() {
    document.getElementById("petName").textContent = myPet.name;
    document.getElementById("petType").textContent = `Type: ${myPet.type}`;

    document.getElementById("healthBar").style.width = myPet.health + "%";
    document.getElementById("hungerBar").style.width = myPet.hunger + "%";
    document.getElementById("energyBar").style.width = myPet.energy + "%";

    document.getElementById("healthValue").textContent = myPet.health;
    document.getElementById("hungerValue").textContent = myPet.hunger;
    document.getElementById("energyValue").textContent = myPet.energy;

    document.getElementById("log").textContent =
    `Mood: ${myPet.mood}`;

    myPet.save();
}

// ==========================
// ACTION BUTTONS
// ==========================
function feedPet() {
    myPet.feed();
    updateUI();
}

function playWithPet() {
    myPet.play();
    updateUI();
}

function showStatus() {
    document.getElementById("statusOutput").textContent =
        myPet.getStatus();
}

// ==========================
// AUTO HEALTH DECAY EVERY 5s
// ==========================
setInterval(() => {
    myPet.decay();
    updateUI();
}, 5000);

// ==========================
// CONNECT BUTTONS TO LOGIC
// ==========================
document.getElementById("feedBtn").addEventListener("click", () => {
    myPet.feed();
    updateUI();
    document.getElementById("log").textContent = "You fed your pet 🍖";
});

document.getElementById("playBtn").addEventListener("click", () => {
    myPet.play();
    updateUI();
    document.getElementById("log").textContent = "You played with your pet 🎾";
});

document.getElementById("statusBtn").addEventListener("click", () => {
    document.getElementById("log").textContent = myPet.getStatus();
});
// Initial UI render
updateUI();