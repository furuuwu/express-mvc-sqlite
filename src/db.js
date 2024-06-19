// Configuration for connecting to your SQLite database using Node.js

// https://www.npmjs.com/package/sqlite3
// npm i sqlite3

const sqlite3 = require('sqlite3').verbose();
/*
The .verbose() method in the sqlite3 library enables additional
debugging and logging features for the SQLite database.
TLDR better error messages, same API.
*/

require('dotenv').config();
const path_to_db = process.env.SQLITE_DB_PATH || '../db/school.db'
// the .env should be placed in the project root. So the relative paths will be different
/*
sqlite uses a file to store the database
(this is unlike mysql or postgres, which use a server)
so all you need to provide is the path to the file
*/

// Open a connection to the database
const db = new sqlite3.Database(path_to_db, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
