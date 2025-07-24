
require("dotenv").config();

const express = require('express')
const cors = require('cors'); // Import CORS middleware
const { Server } = require("socket.io"); // Import Socket.IO Server class
const MongoClient = require('mongodb').MongoClient
const configMongoDB = require('../config/db.config')

const http = require('http');
const mongoDB = process.env.MONGODB_USER;
const mongoPassDB = process.env.MONGODB_PASSWORD;
const mongoNameDB = process.env.MONGODB_DATABASE;
const mongoHostDB = process.env.DB_HOST;
const mongoPortDB = process.env.DB_PORT;

const dbString = {
    url: `mongodb://${mongoDB}:${mongoPassDB}@${mongoHostDB}:${mongoPortDB}/${mongoNameDB}?authSource=admin`
  }
  

const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(mongoNameDB);

    // Example: list collections
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections);
    
    // return db if needed
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
//TODO: USE this mongoDB instance to get and insert data to DB 
const mongoDBIntance = await connectToMongo();

  //API and endpoints intialization
  const app = express()
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies


// Create an HTTP server using the Express app
const server = http.createServer(app);


// Initialize a new instance of Socket.IO by passing the HTTP server
const io = new Server(server, {
    cors: {
      origin: "*", // Allow requests from this origin and my frontend port = 5173
      methods: ["GET", "POST"], // Allow these HTTP methods
    },
  });

//   // Listen for incoming Socket.IO connections
io.on("connection", (socket) => {
    console.log("User connected ", socket.id); // Log the socket ID of the connected user

});

//TODO: create a dynamic namespace to every document
const nsp = io.of(/^\/doc-\w+$/);

nsp.on("connection", socket => {
  console.log("someone connected",socket.id);
  nsp.emit('NEW:USER','new user',socket.id)

  socket.on('UPDATE:TEXT', (msg) => {
    // Broadcast the message to all other clients in the namespace
    socket.broadcast.emit('UPDATED:TEXT', msg);
  });
});

app.get('/', (req, res) => {
  
  
  const docList = [{id:'id1',fileName:'file1'},{id:'id12',fileName:'file2'},{id:'id3',fileName:'file3'}];
  //Get all documents that exist
  res.send(docList);
});

app.post('/document', (req, res) => {
  //Create doc
  res.send('<h1>Hello world</h1>');
});

app.get('/document/:documentId', (req, res) => {
  //Get document with matched id
  const param = req.params.documentId;
  const docList = [{id:'id1',fileName:'file1'},{id:'id12',fileName:'file2'},{id:'id3',fileName:'file3'}];
  
  const doc= docList.filter((item)=>{return item.id === param})
  
  res.send(doc);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});