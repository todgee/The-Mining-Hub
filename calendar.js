document.addEventListener("DOMContentLoaded", function() {
    // Get the form and feed elements
    var formContainer = document.getElementById("event-creation-container");
    var feedContainer = document.querySelector(".event-feed-container");
    var addButton = document.getElementById("add-event-button");

    // Initially hide the event creation form
    formContainer.style.display = "none";

    // Function to toggle the visibility of the event creation form
    function toggleEventForm() {
        if (formContainer.style.display === "none" || formContainer.style.display === "") {
            formContainer.style.display = "block";
            feedContainer.style.display = "none";
            addButton.style.display = "none";
        } else {
            formContainer.style.display = "none";
            feedContainer.style.display = "block";
            addButton.style.display = "block";
        }
    }

    // Event listener for form submission
    document.getElementById("event-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const eventName = document.getElementById("event-name").value;
        const eventDate = document.getElementById("event-date").value;
        const eventTime = document.getElementById("event-time").value;
        const eventDescription = document.getElementById("event-description").value;

        // Create a new list item for the event feed
        const eventItem = document.createElement("li");

        // Add content to the list item
        eventItem.innerHTML = `
          <h3>${eventName}</h3>
          <p>Date: ${eventDate} Time: ${eventTime}</p>
          <p>Description: ${eventDescription}</p>
        `;

        // Append the event item to the feed
        document.getElementById("event-feed").appendChild(eventItem);

        // Reset the form
        event.target.reset();

        // Hide the form and show the feed again
        toggleEventForm();
    });

    // Bind the toggle function to the button
    addButton.addEventListener("click", toggleEventForm);
});
