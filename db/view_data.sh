#!/bin/bash

# Path to your SQLite database file
db_path="./school.db"

# Path to your SQL script
sql_script="./view_data.sql"

# Check if SQLite and the database file exist
if ! command -v sqlite3 &> /dev/null; then
    echo "Error: sqlite3 command not found. Please install SQLite."
    exit 1
fi

if [ ! -f "$db_path" ]; then
    echo "Error: Database file '$db_path' not found."
    exit 1
fi

# Execute SQL script using sqlite3
sqlite3 "$db_path" < "$sql_script"
