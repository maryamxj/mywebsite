
console.log("Game JavaScript is working");

// All three mysteries
const cases = [
    {
        title: "🕵️ Case #001: The Great Cheese Heist 🍕",
        story: "One pizza. Four suspects. Absolutely zero trustworthy people. Who stole the last slice?",
        culprit: "mia",
        suspects: [
            {
                id: "mia",
                name: "👩 Mia the Influencer",
                description: "Believes every life event needs a photo.",
                statement: "I was taking selfies. The pizza was DEFINITELY not in any of them. Probably."
            },
            {
                id: "leo",
                name: "👨 Leo the gym guy",
                description: 'Calls carrying shopping bags "leg day".',
                statement: "I was doing push-ups. I only eat food with at least 20g of protein."
            },
            {
                id: "bruno",
                name: "👨 Bruno the Chef",
                description: "Has very strong opinions about cheese.",
                statement: "I was making garlic bread. I would NEVER steal a pizza slice. I'm professional!"
            },
            {
                id: "daisy",
                name: "👩 Daisy the diet girl",
                description: "Claims lettuce is must for everyday food",
                statement: "I was eating salad. Yes, voluntarily. Please respect my choices."
            }
        ],
        clues: [
            {
                id: "crumbs",
                name: "🧀 The Cheese Trail",
                text: "Cheese crumbs were found on Bruno's apron. He says they came from the garlic bread he was making."
            },
            {
                id: "receipt",
                name: "🧾 The Receipt",
                text: "The pizza was reported missing at 12:10. Mia says her last selfie was taken at 12:05 but its photo timestamp says 12:12."
            },
            {
                id: "note",
                name: "📝 The Photo ",
                text: "In the corner of Mia's selfie, the pizza plate is visible beside her phone."
            }
        ]
    },
    {
        title: "🕵️ Case #002: The Disappearing Pizza Box 📦",
        story: "The entire pizza box has vanished from the office. This is officially the worst workplace ever.",
        culprit: "pickle",
        suspects: [
            {
                id: "tilly",
                name: "🥣 Tilly the Intern",
                description: "Runs on soup and unpaid overtime.",
                statement: "I was heating soup. I don't even like pizza that much! Please don't tell my manager I used the microwave again."
            },
            {
                id: "rex",
                name: "🛵 Rex the Delivery Guy",
                description: "Treats every delivery like an Olympic sport.",
                statement: "I dropped off the box and left. I'm a professional. I only steal... I mean deliver!"
            },
            {
                id: "pickle",
                name: "📋 Professor Pickle",
                description: "Schedules meetings about other meetings.",
                statement: "I was in a very important productivity meeting until 12:30. We achieved absolutely nothing."
            }
        ],
        clues: [
            {
                id: "delivery",
                name: "🛵 The Delivery Record",
                text: "The delivery photo shows the pizza box inside the office at 12:02. Rex's delivery was marked complete shortly afterwards."
            },
            {
                id: "microwave",
                name: "🥣 The Microwave Log",
                text: "Tilly heated her soup at 12:06. The microwave log confirms it, although it does not prove what she did afterwards."
            },
            {
                id: "meeting",
                name: "📋 The Meeting Notes",
                text: "Professor Pickle claimed his meeting lasted until 12:30, but the office calendar says it was cancelled at 11:55."
            }
        ]
    },
    {
        title: "🕵️ Case #003: The Final Slice Conspiracy 🎩",
        story: "One last slice disappeared at a birthday party. Three suspects.",
        culprit: "gary",
        suspects: [
            {
                id: "gary",
                name: "🎩 Gary the Magician",
                description: "His tricks are usually disappointing.",
                statement: "I was practising a disappearing trick! My hat was empty. Unless... no, definitely empty."
            },
            {
                id: "noodle",
                name: "🧮 Noodle the Accountant",
                description: "Counts everything, including people's blinks.",
                statement: "I was counting the napkins. There were 26. There are now 25. This is unrelated but yh."
            },
            {
                id: "bev",
                name: "🎂 Auntie Bev",
                description: "Will feed you even if you say you're full.",
                statement: "I was carrying the birthday cake with both hands. I would never waste food. Especially free food!"
            }
        ],
        clues: [
            {
                id: "hat",
                name: "🎩 The Magic Hat",
                text: "Gary said he never put his hat down. But a party photo shows it sitting beside the pizza table at the time the slice vanished."
            },
            {
                id: "napkins",
                name: "🧮 The Napkin Count",
                text: "Noodle's notes show 26 napkins before the disappearance and 25 afterwards. One napkin has a greasy circle on it."
            },
            {
                id: "photo",
                name: "📸 The Party Photo",
                text: "The photo shows Gary reaching towards his hat. Auntie Bev is carrying the cake, and Noodle is standing across the room counting napkins."
            }
        ]
    }
];

// Get the page elements
const caseTitle = document.getElementById("caseTitle");
const caseExplanation = document.getElementById("caseExplanation");
const suspectGrid = document.getElementById("suspectGrid");
const clueButtons = document.getElementById("clueButtons");
const livesMessage = document.getElementById("lives");
const scoreMessage = document.getElementById("score");
const clueMessage = document.getElementById("clueMessage");
const gameMessage = document.getElementById("gameMessage");
const restartButton = document.getElementById("restartButton");

// Game values
let currentCase = 0;
let lives = 3;
let score = 0;
let caseSolved = false;
let gameFinished = false;

// Display the current mystery
function showCase() {
    const mystery = cases[currentCase];

    caseTitle.textContent = mystery.title;
    caseExplanation.textContent = mystery.story;

    suspectGrid.innerHTML = "";
    clueButtons.innerHTML = "";

    mystery.suspects.forEach(function(suspect) {
        suspectGrid.innerHTML += `
            <div class="suspect-card">
                <h3>${suspect.name}</h3>
                <p>${suspect.description}</p>
                <button class="statement-button" data-suspect="${suspect.id}">
                    Read statement
                </button>
                <p id="statement-${suspect.id}"></p>
                <button class="accuse-button" data-suspect="${suspect.id}">
                    Accuse ${suspect.name.split(" ").slice(1).join(" ")}
                </button>
            </div>
        `;
    });

    mystery.clues.forEach(function(clue) {
        clueButtons.innerHTML += `
            <button class="clue-button" data-clue="${clue.id}">
                ${clue.name}
            </button>
        `;
    });

    livesMessage.textContent =
        "❤️".repeat(lives) + "🖤 ".repeat(3 - lives);

    scoreMessage.textContent = "Score: " + score;
    clueMessage.textContent = "Your investigation starts here, detective.";
    gameMessage.textContent = "";
    restartButton.hidden = true;
    caseSolved = false;
}

// Handle statement and accusation buttons
suspectGrid.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button || gameFinished || caseSolved) {
        return;
    }

    const mystery = cases[currentCase];
    const suspectId = button.dataset.suspect;

    if (button.classList.contains("statement-button")) {
        const suspect = mystery.suspects.find(function(person) {
            return person.id === suspectId;
        });

        document.getElementById("statement-" + suspectId).textContent =
            suspect.statement;
    }

    if (button.classList.contains("accuse-button")) {
        if (suspectId === mystery.culprit) {
            score = score + 100 + (lives * 25);
            scoreMessage.textContent = "Score: " + score;

            gameMessage.textContent =
                "CASE SOLVED! 🎉 You caught the culprit!";

            caseSolved = true;

            if (currentCase === cases.length - 1) {
                gameMessage.textContent += " You solved every mystery!!!";
                finishGame();
            } else {
                gameMessage.textContent += " Next case loading... 🔎";

                setTimeout(function() {
                    currentCase = currentCase + 1;
                    showCase();
                },      2000);

            }
        } else {
            lives = lives - 1;

            livesMessage.textContent =
                "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);

            if (lives === 0) {
                gameMessage.textContent =
                    "GAME OVER! 💀 Too many wrong accusations. " +
                    "The pizza criminals have won.";
                finishGame();
            } else {
                gameMessage.textContent =
                    "WRONG SUSPECT! 😭 Even they look offended. " +
                    "You have " + lives +
                    (lives === 1 ? " life left!" : " lives left!");
            }
        }
    }
});

// Reveal clues
clueButtons.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button || gameFinished || caseSolved) {
        return;
    }

    const mystery = cases[currentCase];
    const clue = mystery.clues.find(function(item) {
        return item.id === button.dataset.clue;
    });
    if(clue){
        clueMessage.textContent = clue.text;
    }
});


// Save the final score and finish
function finishGame() {
    gameFinished = true;
    restartButton.hidden = false;

    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const isGuest = window.location.search.includes("guest=true");

    if (!isGuest &&loggedInEmail) {
        const scores = JSON.parse(localStorage.getItem("gameScores")) || [];

        scores.push({
            email: loggedInEmail,
            score: score
        });

        localStorage.setItem("gameScores", JSON.stringify(scores));
    } else {
        gameMessage.textContent +=
            " Log in if you want your score saved to the rankings!";
    }
}

// Restart the whole game
restartButton.addEventListener("click", function() {
    window.location.reload();
});

// Start Case 1
showCase();
