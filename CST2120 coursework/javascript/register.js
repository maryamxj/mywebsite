
console.log("Register JavaScript is working");
// Get the registration form
const registerForm = document.getElementById("registerForm");

// Password must contain uppercase, lowercase, number and 6 characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
// Email format is checked using JavaScript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Run when the form is submitted
registerForm.addEventListener("submit", function(event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Get the values entered by the user
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Find the feedback paragraph
    const message = document.getElementById("registerMessage");

    // Check whether any fields are empty
    if (email === "" || password === "" || confirmPassword === "") {
        message.textContent = "Please complete all fields.";
        return;
    }

    // Check the email format
    if (!emailRegex.test(email)) {
        message.textContent = "Please enter a valid email address.";
        return;
    }

    // Check the password strength
    if (!passwordRegex.test(password)) {
        message.textContent =
            "Password needs 6 characters, uppercase, lowercase and a number.";
        return;
    }

    // Check whether the passwords match
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match. Please try again.";
        return;
    }

    // Retrieve registered accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Check whether this email is already registered
    const existingAccount = accounts.find(function(account) {
        return account.email.toLowerCase() === email.toLowerCase();
    });

    if (existingAccount) {
        message.textContent =
            "This email already has an account. Please log in.";
        return;
    }
    // Create the new account
    const newAccount = {
        email: email,
        password: password
    };
    // Add the account to the accounts array
    accounts.push(newAccount);

    // Save accounts in JSON format
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Display success feedback
    message.textContent =
        "Account created successfully! You can now log in.";
    // Clear the form
    registerForm.reset();

});
