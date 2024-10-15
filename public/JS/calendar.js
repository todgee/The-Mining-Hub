document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addEventButton = document.getElementById('add-event-button');
    const eventCreationContainer = document.getElementById('event-creation-container');
    const eventForm = document.getElementById('event-form');
    const eventFeed = document.getElementById('event-feed');
    const eventTypeSelect = document.getElementById('event-type');
    const transportDetailsContainer = document.getElementById('transport-details-container');
    const transportMaterialSelect = document.getElementById('transport-material');
    const transportQuantityInput = document.getElementById('transport-quantity');
    const startDateInput = document.getElementById('event-start-date');
    const endDateInput = document.getElementById('event-end-date');

    // Constants for gold value calculation
    const GOLD_PRICE_PER_KG = 127910.60; // AUD
    const TOTAL_COST_PERCENTAGE = 0.04; // 4% total costs

    // Event array to store all events
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Show event creation form
    addEventButton.addEventListener('click', function() {
        eventCreationContainer.style.display = 'block';
    });

    // Hide event creation form when clicking outside
    eventCreationContainer.addEventListener('click', function(e) {
        if (e.target === eventCreationContainer) {
            eventCreationContainer.style.display = 'none';
        }
    });

    // Show/hide transport details based on event type
    eventTypeSelect.addEventListener('change', function() {
        if (this.value === 'transport') {
            transportDetailsContainer.style.display = 'block';
            transportMaterialSelect.required = true;
            transportQuantityInput.required = true;
        } else {
            transportDetailsContainer.style.display = 'none';
            transportMaterialSelect.required = false;
            transportQuantityInput.required = false;
        }
    });

    // Ensure end date is not before start date
    startDateInput.addEventListener('change', function() {
        endDateInput.min = this.value;
    });

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const type = eventTypeSelect.value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const time = document.getElementById('event-time').value;
        const description = document.getElementById('event-description').value;
        const transportMaterial = type === 'transport' ? transportMaterialSelect.value : null;
        const transportQuantity = type === 'transport' ? parseFloat(transportQuantityInput.value) : null;

        // Calculate days between start and end date
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;

        // Calculate estimated value if it's a gold transport event
        let estimatedValue = null;
        if (type === 'transport' && transportMaterial === 'gold') {
            estimatedValue = calculateGoldValue(transportQuantity, days);
        }

        // Create new event object
        const newEvent = { 
            type, 
            startDate, 
            endDate, 
            time, 
            description, 
            transportMaterial, 
            transportQuantity,
            estimatedValue
        };

        // Add new event to events array
        events.push(newEvent);

        // Save to localStorage
        localStorage.setItem('events', JSON.stringify(events));

        // Clear form fields
        eventForm.reset();
        transportDetailsContainer.style.display = 'none';

        // Hide event creation form
        eventCreationContainer.style.display = 'none';

        // Update event feed
        updateEventFeed();
    });

    function formatLargeNumber(number) {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    // Function to calculate gold value
    function calculateGoldValue(quantity, days) {
        const grossValue = quantity * 1000 * GOLD_PRICE_PER_KG;
        const totalCosts = grossValue * TOTAL_COST_PERCENTAGE * days;
        const netValue = grossValue - totalCosts;
        return netValue.toFixed(2);
    }

    function updateEventFeed() {
        // Clear existing events
        eventFeed.innerHTML = '';
    
        // Sort events by start date and time
        events.sort((a, b) => new Date(a.startDate + 'T' + a.time) - new Date(b.startDate + 'T' + b.time));
    
        // Add events to feed
        events.forEach((event, index) => {
            const li = document.createElement('li');
            let eventDetails = `
                <h3><span class="event-type">${event.type}</span> Event</h3>
                <p>Start Date: ${formatDate(event.startDate)}</p>
                <p>Original End Date: ${formatDate(event.endDate)}</p>
            `;
    
            if (event.updatedEndDate) {
                eventDetails += `<p>Updated End Date: <span class="updated-end-date">${formatDate(event.updatedEndDate)}</span></p>`;
            }
    
            eventDetails += `<p>Time: ${formatTime(event.time)}</p>`;
    
            if (event.type === 'transport') {
                eventDetails += `
                    <p>Material: ${event.transportMaterial}</p>
                    <p>Quantity: ${event.transportQuantity} tonnes</p>
                    <p>Estimated Value: <span class="estimated-value">${formatLargeNumber(event.estimatedValue)}</span></p>
                `;
            }
    
            eventDetails += `
                <p>${event.description}</p>
                <button class="delete-event" data-index="${index}">Delete</button>
                <button class="late-early-event" data-index="${index}">Late/Early</button>
            `;
    
            li.innerHTML = eventDetails;
            eventFeed.appendChild(li);
        });
    
        // Add event listeners to late/early buttons
        document.querySelectorAll('.late-early-event').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                showLateEarlyForm(index);
            });
        });
    }
    
    function showLateEarlyForm(index) {
        const event = events[index];
        const li = eventFeed.children[index];
        
        const form = document.createElement('form');
        form.innerHTML = `
            <label for="new-end-date">New End Date:</label>
            <input type="date" id="new-end-date" required min="${event.startDate}">
            <button type="submit">Update</button>
        `;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const newEndDate = this.querySelector('#new-end-date').value;
            updateEventEndDate(index, newEndDate);
            updateEventFeed();
        });
        
        li.appendChild(form);
    }
    
    function updateEventEndDate(index, newEndDate) {
        const event = events[index];
        event.updatedEndDate = newEndDate;
        
        if (event.type === 'transport' && event.transportMaterial === 'gold') {
            const days = Math.ceil((new Date(event.updatedEndDate) - new Date(event.startDate)) / (1000 * 60 * 60 * 24)) + 1;
            event.estimatedValue = calculateGoldValue(event.transportQuantity, days);
        }
        
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Helper function to format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Helper function to format time
    function formatTime(timeString) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString(undefined, options);
    }

    // Initial update of event feed
    updateEventFeed();
});