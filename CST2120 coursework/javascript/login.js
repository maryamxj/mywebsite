//log in form
const loginForm = document.getElementById('loginform');

//Check email format 
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//run when the form is submitted 
loginForm.addEventListener('submit', function(event) {
    //prevent the form from submitting or refreshing 
    event.preventDefault();

    //get the email and password from the user
    const email=document.getElementById('MyEmail').value;
    const password= document.getElementById('MyPassword').value;

    //find the feedback passage
    const message= document.getElementById('message');
    

    //check if any of the fields are empty
    if (email === '' || password === '') {
        message.textContent = "Please enter your email or password";
        return;
    }
    //check the emailformat
    if (!emailRegex.test(email)) {
        message.textContent = "Please enter a valid email address";
        return;
    }

    // Retrieve registered accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Find the account matching the entered email
    const account=accounts.find(function(account) {
        return account.email.toLowerCase() === email.toLowerCase();
    });

    //check whether the accounts exists 
    if (!account){
        message.textContent = "Account does not exist";
        return;
    }
//check whether the password is correct 
    if (account.password !==password) {
        message.textContent = "Incorrect password";
        return;
    }
    //if nay of that is correct the log in is succesful 
    message.textContent="Login successful, Welcome detective";

    //save the logged in email 
    localStorage.setItem('loggedInEmail', account.email);

    //open the game menu 
    window.location.href = "game.html";
});

