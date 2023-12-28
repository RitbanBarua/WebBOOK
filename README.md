
# WebBOOK

WebBOOK is a free, end-to-end encrypted MERN (MongoDB, Express.js, React.js, Node.js) application designed to revolutionize your note-taking experience. Developed with security and accessibility in mind, WebBOOK ensures that your note data is stored securely on MongoDB, allowing you to access it seamlessly from anywhere with an internet connection.


## Features

- Take Notes on-the-go
- Secure
- End-to-End Encryption
- Cross platform
- Free Of Cost


## Table of Contents

- [WebBOOK](#webbook)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Documentation](#documentation)
  - [Development](#development)
    - [Prerequisite](#prerequisite)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
  - [Environment Variables](#environment-variables)
    - [Frontend](#frontend-2)
    - [Backend](#backend-2)
## Installation

Installation is simple.

Run the following command to clone the repository, and install the dependencies.

```bash
  $ git clone https://github.com/RitbanBarua/WebBOOK.git
```

### Frontend

```bash
  $ cd webbook/Frontend
  $ npm install #or yarn install
```

### Backend
    
```bash
  $ cd webbook/Backend
  $ npm install #or yarn install
```
## Documentation

[Documentation](https://github.com/RitbanBarua/WebBOOK/blob/main/Backend/Readme.md)


## Development

### Prerequisite

- [Node JS](https://nodejs.org/en)

### Frontend

Go to the project directory

```bash
  cd webbook/Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### Backend

Go to the project directory

```bash
  cd webbook/Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon ./index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file for particular project directory - one in Frontend and other one in Backend.

### Frontend

`REACT_APP_SECRET_CRYPTO_KEY`

`REACT_APP_REGISTER_URL`

`REACT_APP_LOGIN_URL`

`REACT_APP_LOGOUT_URL`

`REACT_APP_GET_NOTES_URL`

`REACT_APP_CREATE_NOTE_URL`

`REACT_APP_UPDATE_NOTE_URL`

`REACT_APP_DELETE_NOTE_URL`

### Backend

`MongoURI`

`SECRET_KEY`

