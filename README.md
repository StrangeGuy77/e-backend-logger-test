# Logs Application

#### This application focuses on creating, updating and deleting logs from resources sent to it.

## Instructions to function

#### NodeJS

This project runs with NodeJS, therefore you should install it from the official page. For this project you may install the [LTS Stable](https://nodejs.org/en)

After installation, validate using `node --version`, it may show the installed version, and `npm --version`, it may show the latest version.

#### Database

- Install [MongoDB](https://www.mongodb.com/try/download/community)

- At e-backend-logger root, create a .env file, then set **MONGODB_URI** environment variable. It should look something [like this](https://www.mongodb.com/docs/v2.2/reference/connection-string/)

- For Windows, go to a terminal and execute the following command: `mkdir C:\data\db`. Then go to CMD and put the following command: `cd "\Program Files\MongoDB\Server\<MONGO DB VERSION HERE>\bin"` then `mongod`.
  The database local server should execute successfully.

- For Linux, go to a terminal, **change directory to root**, then execute the following command: `mkdir data/db`. Then execute the command `mongod` and the local server should execute succesfully.

#### Run

After following the previous steps, open a terminal and run `npm run start`. The terminal may show a log regarding the database was successfully connected. Then, if you're running locally and didn't set a port, do a request to `localhost:3000`. After that, the terminal may show some logs of the request that has been performed and the server may return an HTML.
