CREATE DATABASE IF NOT EXISTS event_scheduler;
USE event_scheduler;

CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL
);

INSERT INTO events (event_name, event_description, event_date, event_time)
VALUES ('Sample Event', 'Sample Description', '2024-09-10', '15:30:00');
