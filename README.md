# MERN App

This was made with Claude

## Development

To provision a Mongo DB database

```
docker run --name mongodb -d -p 27017:27017 mongo
```

The connection string will be:

```
mongodb://localhost:27017/
```

You can use this to set the `MONGODB_URI` using this. You can also use this for MongoDB Compass.


To run the client

```
cd mern-app
cd client
npm i
npm run dev
```
Navigate tp 


To run the server

```
cd mern-app
cd server
npm i
npm run dev
```