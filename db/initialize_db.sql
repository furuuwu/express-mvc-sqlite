-- This SQL script will create the students and professors tables in the SQLite database

-- Create students table
CREATE TABLE IF NOT EXISTS student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER,
    dob TEXT -- ISO-8601 format for dates
);

-- Create professors table
CREATE TABLE IF NOT EXISTS professor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Classes table
CREATE TABLE class (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Student_Classes junction table
CREATE TABLE student_class (
    student_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
);

-- Insert data into students table
INSERT INTO student (name, email, age, dob) VALUES
    ('Bald Guy', 'bald.guy@example.com', 25, '1999-01-01'),
    ('Selfie Joana', 'selfie.joana@example.com', 22, '2002-03-15'),
    ('Alice', 'alicewonderland@gmail.com', 99, '2001-04-22')
;

-- Insert sample classes
INSERT INTO class (name) VALUES ('Math'), ('History'), ('Science');

-- Insert sample student_classes associations
INSERT INTO student_class (student_id, class_id) VALUES
    (1, 1), (1, 2),
    (2, 2), (2, 3),
    (3, 1), (3, 3);