const rankingList = document.getElementById("rankingList");
const rankingMessage = document.getElementById("rankingMessage");

// Get the saved game scores
const scores = JSON.parse(localStorage.getItem("gameScores")) || [];

// Put the highest score first
scores.sort(function(a, b) {
    return b.score - a.score;
});

// Show a message if there are no scores
if (scores.length === 0) {
    rankingMessage.textContent = "No scores yet! Play the game to get on the rankings.";
} else {

    // Display each player's ranking
    scores.forEach(function(player, index) {
        const row = document.createElement("tr");

        const rank = document.createElement("td");
        rank.textContent = index + 1;

        const name = document.createElement("td");
        name.textContent = player.email.split("@")[0];

        const score = document.createElement("td");
        score.textContent = player.score;

        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(score);

        rankingList.appendChild(row);
    });
}