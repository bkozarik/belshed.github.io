import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import MongoDB from './dataBase.js';

const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

const port = 1337;
const dbURI = 'mongodb://localhost:27017/api';
const dbName = 'vote_db';

const mongoDb = new MongoDB(dbURI, dbName);

server.use(express.urlencoded({ extended: true }));

server.use(express.json());

server.get('/', async (req, res) => {
    const id = await mongoDb.put('vote_data', {data: '22'});

    const result = await mongoDb.get('vote_data', {_id: id});
    
    res.send(result);
});

server.get('/data', (req, res) => {
    const result = {
        das: 22231
    };
    
    res.send(JSON.stringify(result));
});

server.post('/put-data', (req, res) => {
    const result = {
        status: true
    
    };
    
    console.log(req.body);

    res.send(JSON.stringify(result));
});

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})