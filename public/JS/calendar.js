document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display events
    function displayEvents() {
        fetch('/get-events')
            .then(response => response.json())
            .then(events => {
                const eventFeed = document.getElementById('event-feed');
                eventFeed.innerHTML = '';  // Clear existing events
                events.forEach(event => {
                    const li = document.createElement('li');
                    li.textContent = `${event.event_name} - ${event.event_description} on ${event.event_date} at ${event.event_time}`;
                    eventFeed.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching events:', error));
    }

    // Event form submission handler
    document.getElementById("event-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const eventName = document.getElementById("event-name").value;
        const eventDate = document.getElementById("event-date").value;
        const eventTime = document.getElementById("event-time").value;
        const eventDescription = document.getElementById("event-description").value;

        const newEvent = {
            eventName: eventName,
            eventDate: eventDate,
            eventTime: eventTime,
            eventDescription: eventDescription
        };

        // Send the new event to the server to store it in the database
        fetch('/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(newEvent)
        })
            .then(response => response.text())
            .then(data => {
                console.log(data); // You can add a success message here
                displayEvents();  // Refresh the event list after adding a new event
                event.target.reset();  // Reset the form
            })
            .catch(error => console.error('Error adding event:', error));
    });

    // Display any events stored in the database when the page loads
    displayEvents();

    // Function to toggle form visibility
    function toggleEventForm() {
        const formContainer = document.getElementById('event-creation-container');
        if (formContainer.style.display === 'none' || formContainer.style.display === '') {
            formContainer.style.display = 'block';
        } else {
            formContainer.style.display = 'none';
        }
    }

    // Bind the toggle function to the "Add Event" button
    const addButton = document.getElementById('add-event-button');
    addButton.addEventListener("click", toggleEventForm);
});
