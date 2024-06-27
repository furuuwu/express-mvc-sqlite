# Express and sqlite

- mostly equal to [this tutorial](https://www.youtube.com/watch?v=DihOP19LQdg)

- differences:
    - sqlite instead of postgresql
    - other options for db management
    - use of .env and the vscode rest client extension (.http file)
    - without the errors

- instructions:
    - install node and npm

    - install the dependencies for this project

        which are:
        - "dotenv": "^16.0.0", // this semantic versioning syntax means >= 16 but < 17
        - "express": "^4.0.0",
        - "sqlite3": "^5.0.0"

        which you can do by running

        `node install`

    - initialize a database

        go to /db/ and follow the instructions

    - go back to the project root and start the app

        `node src/server.js`

        or just

        `npm start`

        (since i added this script to package.json `"start": "node server.js"`)

This is just the bare basics tho. After this, i suggest following [this](https://www.youtube.com/watch?v=JnEH9tYLxLk) and [this](https://www.youtube.com/watch?v=K8YELRmUb5o) and building your own projects...