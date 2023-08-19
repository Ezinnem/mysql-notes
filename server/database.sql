CREATE DATABASE mysqlnotes;

CREATE TABLE note(
    note_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);