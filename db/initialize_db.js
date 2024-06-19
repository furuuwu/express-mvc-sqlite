const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, 'school.db'); // Change this to your desired database name

// Create a new database or open the existing one
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// SQL query to create the students table
const createStudentsTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER,
        dob TEXT -- ISO-8601 format for dates
    );
`;

// SQL query to create the professors table
const createProfessorsTableQuery = `
    CREATE TABLE IF NOT EXISTS professors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    );
`;

// SQL query to insert initial user data into students table
const insertInitialStudentsDataQuery = `
    INSERT INTO students (name, email, age, dob) VALUES
    ('Bald Guy', 'bald.guy@example.com', 25, '1999-01-01'),
    ('Selfie Joana', 'selfie.joana@example.com', 22, '2002-03-15');
`;

// Run the create tables queries
db.run(createStudentsTableQuery, (err) => {
    if (err) {
        console.error('Error creating students table:', err.message);
    } else {
        console.log('Students table created successfully.');


        // Insert initial data after creating the table
        db.run(insertInitialStudentsDataQuery, (err) => {
            if (err) {
                console.error('Error inserting initial data:', err.message);
            } else {
                console.log('Initial data inserted successfully.');
            }
        });
    }
});

db.run(createProfessorsTableQuery, (err) => {
    if (err) {
        console.error('Error creating professors table:', err.message);
    } else {
        console.log('Professors table created successfully.');
    }
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
