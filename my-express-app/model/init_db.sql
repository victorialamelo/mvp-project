-- Drop Tables
DROP TABLE IF EXISTS ScheduleItem;
DROP TABLE IF EXISTS Schedule;
DROP TABLE IF EXISTS User;
-- Create Tables
CREATE TABLE User(
    user_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (user_id)
);
CREATE TABLE Schedule(
    schedule_id INT NOT NULL AUTO_INCREMENT,
    schedule_name VARCHAR(40) not null,
    PRIMARY KEY (schedule_id)
);
CREATE TABLE ScheduleItem(
    item_id INT NOT NULL AUTO_INCREMENT,
    schedule_id INT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    item_order INT NOT NULL CHECK(item_order > 0),
    location_name VARCHAR(40) not null,
    PRIMARY KEY (item_id),
    FOREIGN KEY (schedule_id) REFERENCES Schedule(schedule_id)
);