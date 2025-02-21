// Function to handle Profile Form Submission
document.getElementById('profile-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (username && email && password) {
        updateProfile(username, email, password);
    } else {
        alert("Please fill out all fields.");
    }
});

function updateProfile(username, email, password) {
    // Update the user profile on the server (mock API call for this example)
    fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Profile updated successfully.");
            document.getElementById('profile-info').innerHTML = `
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
            `;
        } else {
            alert("Profile update failed.");
        }
    })
    .catch(error => alert("Error: " + error));
}

// Function to verify the ticket
function verifyTicket() {
    const ticketNumber = document.getElementById('ticket-number')?.value;
    const qrInput = document.getElementById('qr-code-input')?.files[0];

    if (ticketNumber) {
        // Simulate ticket verification based on the ticket number
        checkTicket(ticketNumber);
    } else if (qrInput) {
        // If a QR code is uploaded, we can process it (here we simulate)
        processQRCode(qrInput);
    } else {
        alert("Please enter a ticket number or scan a QR code.");
    }
}

// Simulate a ticket number check (e.g., via an API call)
function checkTicket(ticketNumber) {
    fetch(`/api/verify-ticket/${ticketNumber}`)
        .then(response => response.json())
        .then(data => {
            if (data.isValid) {
                document.getElementById('verification-result').textContent = 'Ticket is valid!';
            } else {
                document.getElementById('verification-result').textContent = 'Ticket is invalid!';
            }
        })
        .catch(error => alert("Error verifying ticket: " + error));
}

// Simulate QR Code processing (you'd integrate an actual QR code library here)
function processQRCode(qrInput) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const scannedData = event.target.result;
        alert("QR code scanned: " + scannedData);  // In practice, use a library to parse the QR code
        // You can pass the scanned QR data to a function to verify it
    };
    reader.readAsText(qrInput);
}

// Function to handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        loginUser(username, password);
    } else {
        alert("Please fill in both username and password.");
    }
});

function loginUser(username, password) {
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful!");
            window.location.href = 'profile.html';  // Redirect to the profile page
        } else {
            alert("Invalid credentials. Please try again.");
        }
    })
    .catch(error => alert("Login error: " + error));
}

// Function to handle sign-up form submission
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (username && email && password) {
        signupUser(username, email, password);
    } else {
        alert("Please fill out all fields.");
    }
});

function signupUser(username, email, password) {
    fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Sign-up successful!");
            window.location.href = 'login.html';  // Redirect to the login page
        } else {
            alert("Sign-up failed. Please try again.");
        }
    })
    .catch(error => alert("Sign-up error: " + error));
}

// Dynamically fetch events for the Events page (you can integrate with an API)
function loadUpcomingEvents() {
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            const eventListContainer = document.getElementById('events-list');
            eventListContainer.innerHTML = '';  // Clear the event list
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <img src="${event.image}" alt="${event.title}">
                    <h3>${event.title}</h3>
                    <p>Date: ${event.date}</p>
                    <p>Location: ${event.location}</p>
                    <p>Time: ${event.time}</p>
                    <button onclick="window.location.href='ticket-verification.html'">Buy Tickets</button>
                `;
                eventListContainer.appendChild(eventCard);
            });
        })
        .catch(error => alert("Error loading events: " + error));
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('events-list')) {
        loadUpcomingEvents();
    }
});
// Function to calculate and display the total price when the user changes the number of tickets
document.getElementById('ticketCount').addEventListener('input', function() {
    var ticketCount = this.value;
    var pricePerTicket = 20; // Example price per ticket
    var totalPrice = ticketCount * pricePerTicket;

    // Display the total price dynamically
    document.getElementById('confirmationMessage').innerText = 'Total Price: $' + totalPrice;
});

// Function to calculate and display the total price when the user changes the number of tickets
document.getElementById('ticketCount').addEventListener('input', function() {
    var ticketCount = this.value;
    var pricePerTicket = 20; // Example price per ticket
    var totalPrice = ticketCount * pricePerTicket;

    // Display the total price dynamically
    document.getElementById('confirmationMessage').innerText = 'Total Price: $' + totalPrice;
});

// Function to generate a random 5-digit ticket number
function generateTicketNumber() {
    return Math.floor(10000 + Math.random() * 90000); // Generates a random number between 10000 and 99999
}

// Form submission logic
document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from being submitted normally

    // Get the number of tickets entered by the user
    var ticketCount = document.getElementById('ticketCount').value;
    
    if (ticketCount >= 1 && ticketCount <= 10) {
        // Generate a random ticket number
        var ticketNumber = generateTicketNumber();

        // Display confirmation message with ticket number and price
        document.getElementById('confirmationMessage').innerHTML = `
            <h3>Ticket Purchase Confirmed!</h3>
            <p>You have successfully selected <strong>${ticketCount}</strong> tickets.</p>
            <p>Your unique ticket number is: <strong>${ticketNumber}</strong></p>
            <p>The total price is: $${ticketCount * 20}</p>
        `;
        
        // You can also send this data to the server using an AJAX request here if needed.
        // For now, let's assume you just want to show the confirmation on the page.
    } else {
        // If the number of tickets is not valid, show an error
        document.getElementById('confirmationMessage').innerHTML = `
            <p style="color: red;">Please select a valid number of tickets between 1 and 10.</p>
        `;
    }
});
