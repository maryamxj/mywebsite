const accountMessage = document.getElementById('accountMessage');
const isGuest = window.location.search.includes("guest=true");
const loggedInEmail = localStorage.getItem('loggedInEmail');

if (isGuest) {
    accountMessage.textContent = "Playing as Guest";
}else if (loggedInEmail) {
    accountMessage.textContent = 'Logged in as ' + loggedInEmail.split('@')[0];
} else {
    accountMessage.textContent = 'Playing as Guest';
}
