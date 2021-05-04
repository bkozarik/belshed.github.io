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

server.post('/vote-data', async (req, res) => {
    const data = req.body;

    data.name = 'vote_info';

    const query = {
        name: 'vote_info',
    }

    const dataId = await mongoDb.replace('vote_data', query, data);

    const result = {
        status: true,
        id: dataId,
    };

    res.send(JSON.stringify(result));
});

server.get('/votes/:voteId', async (req, res) => {
    const voteId = req.params.voteId;

    let votes = await mongoDb.getMany('votes', {voteId});

    res.send(JSON.stringify(votes.map(vote => {
        return {
            ciphergram: vote.ciphergram,
            voteText: vote.voteText,
        }
    })));
});

server.post('/sendVote', async (req, res) => {
    const requestData = req.body;

    const result = {
        status: true,
    };
    
    const voteItem = {
        voteId: requestData.voteId,
        voteText: requestData.voteText,
        ciphergram: requestData.ciphergram,
    }

    await mongoDb.put('votes', voteItem);

    res.send(JSON.stringify(result));
});

server.get('/vote-data', async (req, res) => {
    const query = {
        name: 'vote_info',
    }

    let result = await mongoDb.get('vote_data', query);
    const obj = {};

    if(result){
        obj.id = result._id;
        result?.fieldData.forEach(item => {
            obj[item.name] = item.value;
    
            return obj;
        });
    }
    
    res.send(JSON.stringify(obj));
});

server.get('/key/:type', async (req, res) => {
    const type = req.params.type;
    const query = {
        name: 'keys',
        type,
    }

    let result = await mongoDb.get('keys', query);
    
    if(result){
        res.send(JSON.stringify(result));
    }
});

server.post('/key', async (req, res) => {
    const requestData = req.body;
    const name = 'keys';

    const data = {
        ...requestData,
        name,
    }
    
    const query = { name };

    const replacedDoc = await mongoDb.replace('keys', query, data);
    
    if(replacedDoc === undefined){
        await mongoDb.put('keys', data);
    }

    if(requestData){
        res.send(JSON.stringify({status: true}));
    }
});

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});