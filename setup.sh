    #!/bin/bash

    # Install server dependencies
    npm install

    # Compile TypeScript
    tsc

    # Create the database
    node build/config/createDB.js

    # Run migrations and seeds
    cd src
    npx knex migrate:latest --env development
    npx knex migrate:latest --env test
    npx knex seed:run --env development
    npx knex seed:run --env test

    # Install client dependencies and build
    cd ../client
    npm install
    npm run build

    # Start the server
    cd ..
    npm start
