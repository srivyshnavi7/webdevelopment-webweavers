// tracking.js

function startTracking() {
    const trackingInterval = setInterval(() => {
        fetch('/api/get-attendee-status')
            .then(response => response.json())
            .then(data => {
                if (data.attendees) {
                    updateAttendeeList(data.attendees);
                }
            })
            .catch(error => {
                console.error("Error fetching attendee data:", error);
            });
    }, 10000);  // Polling every 10 seconds for live updates

    function updateAttendeeList(attendees) {
        const attendeeListContainer = document.getElementById('attendee-list');
        attendeeListContainer.innerHTML = '';
        attendees.forEach(attendee => {
            const listItem = document.createElement('li');
            listItem.textContent = `Attendee: ${attendee.name} - Status: ${attendee.status}`;
            attendeeListContainer.appendChild(listItem);
        });
    }

    // To stop tracking, you can clear the interval:
    // clearInterval(trackingInterval);
}

// Start the live tracking when the page is ready
startTracking();

