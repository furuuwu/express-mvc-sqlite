-- This SQL script will create the students and professors tables in the SQLite database

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER,
    dob TEXT -- ISO-8601 format for dates
);

-- Create professors table
CREATE TABLE IF NOT EXISTS professors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Insert data into students table
INSERT INTO students (name, email, age, dob) VALUES
    ('Bald Guy', 'bald.guy@example.com', 25, '1999-01-01'),
    ('Selfie Joana', 'selfie.joana@example.com', 22, '2002-03-15')
;