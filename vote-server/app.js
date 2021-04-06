const express = require('express');
const { MongoClient } = require("mongodb");

const dbURI = 'mongodb://localhost:27017/api';

const dbClient = MongoClient(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const server = express();

server.get('/', (req, res) => {
  
});

// server.listen(1337, () => {
//   console.log(`server started at ${new Date()}`);
// })

async function run() {
  try {
    await dbClient.connect();
    const database = dbClient.db('vote_db');
    const collection = database.collection('registration_data');
    
    const obj = { title: 'Back to the Future' };
    const movie = await collection.deleteOne(obj);
  } finally {
    await dbClient.close();
  }
}
run().catch(console.dir);