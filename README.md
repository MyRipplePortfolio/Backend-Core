# Backend-Core
## Note for All Developers
For this structure, the API's source code is kept in the `/src` folder. Inside the `src` folder, we have different folders to manage our code, including `config`, `controllers`, `middlewares`, `models`, and `routes` folders.

The `config` folder contains configuration files, such as environment variables and database setup files. 

The `controllers` folder contains API endpoint logic and handles requests to the server. 

The `middlewares` folder contains the middleware functions that validate and process incoming requests. 

The `models` folder contains data models used in the API. The routes folder contains the endpoint URLs that are used to access the different functionalities of the API.

Finally, we have an `index.js` file in the root of the API folder that acts as the entry point for our API. Here, we can start the Node.js application and define the port number to listen to incoming requests.
#
## Dependencies
Here are the dependencies required to build the APIs.

## Backend Dependencies:

- **Node.js** - The JavaScript runtime used to build the backend APIs.
- **Express.js** - A popular Node.js framework used to build web APIs.
- **Mongoose** - A Node.js package used to interact with MongoDB database.
- **jsonwebtoken** - A Node.js package used to generate and verify JSON web tokens for user authentication.
- **axios** - A promise-based HTTP client for Node.js to make requests to external APIs.
- **xrpl.js** - A JavaScript/TypeScript library for interacting with the XRP Ledger. https://js.xrpl.org

- **dotenv** - Loads environment variables from a `.env` file.
- **body-parser** -  Node.js body parsing middleware


## Database:

- **MongoDB** - A document-oriented NoSQL database that is used for storing data as JSON-like documents.

To get started, you would need to install Node.js and MongoDB on your machine. Once installed, you can install the required Node.js packages by running `npm install` in the root folder of your project to install all the required packages.

## Environment Variables (.env)

Create a `.env` file and add :

- `DB_CONNECT` -> The mongoDB connection info.

- `JWT_SECRET` -> Your JSON web token "secret"

- `JWT_EXPIRATION_TIME` -> Your JWT expiration time

```env
DB_CONNECT = mongodb+srv://<user>:<password><yourmongoDBStuff>/<DatabaseName>
JWT_SECRET = <Your Secret>
JWT_EXPIRATION_TIME = 3600
```

#
## APIs Documentation
https://bit.ly/3LGQalh
