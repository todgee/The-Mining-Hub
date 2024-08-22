document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Default view (monthly grid)
        events: [] // Placeholder for events, you can add dynamic events later
    });

    calendar.render();
});
