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

#### Environment variables

Check `.env.example` file to fulfill the variables needed to run the application. Remember to pass them into a solely `.env` file

#### Install dependencies

Run `npm install` to install all the necessary npm dependencies

#### Run

After following the previous steps, open a terminal and run `npm run start`. The terminal may show a log regarding the database was successfully connected. Then, if you're running locally and didn't set a port, do a request to `localhost:3000`. After that, the terminal may show some logs of the request that has been performed and the server may return an HTML.

## Authentication

This application uses JWT for authentication for all its endpoints. Follow these steps to successfully authenticate and use the endpoints.

1.  From a DB Manager, create a document in the `Applications` schema and get its id.

2.  Send a request to `POST /api/auth` with a body with the application id. It may look something like this:

    >

        "applicationId":"(ID GOES HERE)

3.  If you successfully followed the first step, you may receive a response from the server that looks like this:

    >

        "message": "Successfully authenticated",
        "token": "(AUTH TOKEN COMES HERE)"

4.  Get the token from the response and set it to the headers of the request you need to perform like this:

    >

        authorization: (AUTH TOKEN HERE)
