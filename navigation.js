function navigateTo(page) {
    switch(page) {
        case 'home':
            window.location.href = 'ChatBot.html'; 
            break;
        case 'chat':
            window.location.href = 'chat.html'; 
            break;
        case 'schedule':
            window.location.href = 'calendar.html'; 
            break;
        case 'settings':
            window.location.href = 'settings.html'; 
            break;
        case 'profile':
            window.location.href = 'profile.html'; 
            break;
        default:
            console.log('Unknown page: ' + page);
    }
}
