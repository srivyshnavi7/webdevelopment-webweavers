// auth.js

function loginUser(username, password) {
    // Send a login request to the backend API
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("authToken", data.token);  // Store auth token
            window.location.href = "/profile.html";  // Redirect to profile page
        } else {
            alert("Login failed. Please check your credentials.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function logoutUser() {
    localStorage.removeItem("authToken");  // Remove auth token
    window.location.href = "/index.html";   // Redirect to homepage
}

// Example of signup function (similar structure to login)
function signupUser(username, password, email) {
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Signup successful! Please login.");
            window.location.href = "/login.html";
        } else {
            alert("Signup failed. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

