# NodeReads

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

## Table of Contents
- [Description](#description)
- [Purpose](#purpose)
- [Installation Instructions](#installation-instructions)
- [Usage Instructions](#usage-instructions)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [License](#license)
- [Credits](#credits)

## Description
NodeReads is a full-stack Google Books search engine using GraphQL and Apollo Server. 
It allows users to search for books, save searches, and manage reading preferences. 
Built on the MERN stack, it replaces traditional RESTful APIs with a modern GraphQL solution.

## Purpose
NodeReads modernizes the application architecture by replacing traditional MongoDB implementation with GraphQL for efficient data querying and mutation.

## Installation Instructions
1. Clone the repository: `git clone https://github.com/keithrsialana/nodereads.git`
2. Navigate to the project directory: `cd nodereads`
3. Install dependencies for both server and client:
   ```bash
   npm i
   npm run install
   npm run build
   ```
4. Set up your `.env` file with the necessary configurations (MongoDB URI, API keys, etc.).
This is an example of what the `.env` file should look like
```
MONGODB_URI=mongodb://127.0.0.1:27017/nodereads
JWT_SECRET_KEY=thisisasecret!
```

## Usage Instructions
1. Start the dist files with the following command:
```
npm run start
```
2. Access the application in your browser at `http://localhost:3000`.
3. Use the search bar to find books using the Google Books API and save them to your account.

## Technologies Used
- **Express.js**: Backend framework for building the server.
- **React**: Front-end library for building the user interface.
- **Node.js**: JavaScript runtime for the server-side logic.
- **Apollo Server**: Implementation of a GraphQL server for efficient API communication.
- **GraphQL**: Query language for API calls.
- **MongoDB**: NoSQL database for storing user data and book information.
- **Mongoose**: MongoDB ORM for interacting with the database
- **Google Books API**: API for searching and retrieving book information.
- **JWT**: JSON Web Tokens for authentication and authorization.

## Features
- Search for books using the Google Books API.
- Save book searches to a personal account.
- Refactored backend architecture using GraphQL.
- Secure user authentication.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits
Developed by Keith Sialana.  
Google Books API integration.  
Special thanks to the MERN community and GraphQL contributors.
