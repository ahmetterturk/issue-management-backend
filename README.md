# T3A2 - Backend

## Link to front-end repo

#### [Front-end Repository](https://github.com/saman-zdf/issue-management-client)

## Installation of the backend

```
git clone git@github.com:ahmetterturk/issue-management-backend.git
```

To install all dependencies, navigate to root directory and run;

```
npm install
```

There are some API configurations that need to be added to the `.env` file. These are the MongoDB Atlas database URI, Cloudinary API keys, and a unique string for the JWT_SECRET.

```
<!-- mongoDB URI -->
DATABASE_URI = 'string'

<!-- Cloudinary api key and name -->
CLOUD_NAME = 'string'
CLOUD_API_KEY = 'string'
CLOUD_API_SECRET = 'string'

<!-- JWT secret key, could be any string -->
JWT_SECRET = 'string'
```

Once the configuration of `.env` file done, the program can be run with the command;

```
npm run dev
```
