import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const voteDataScheme = new Schema({value: String, name: String, type: String}, {versionKey: false});
const VoteData = mongoose.model("VoteData", voteDataScheme);

const keysScheme = new Schema({key: Object, type: String}, {versionKey: false});
const KeysData = mongoose.model("KeysData", keysScheme);

const votesScheme = new Schema({voteText: String, ciphergram: String}, {versionKey: false});
const VotesData = mongoose.model("VotesData", votesScheme);

const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

const port = 1337;
const dbURI = 'mongodb://localhost:27017/api';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to database!'))
.catch(() => console.log('Failed to connect database!'));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.post('/vote-data', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const data = req.body;

    data.fieldData.forEach(field => {
        const fieldData = {
            value: field.value,
            name: field.name
        }

        const voteData = new VoteData(fieldData);
        
        VoteData.updateOne({name: field.name}, fieldData)
        .then(dbRes => {
            if(dbRes.n === 0){
                console.log(`${field.name} not found :/  Saving...`);
                voteData.save()
                .then(dbRes => {
                    //
                })
            }
        });
    });    

    const result = {
        status: true,
    };

    res.send(JSON.stringify(result));
});

server.get('/votes/', async (req, res) => {
    const result = await VotesData.find({}).exec();
    
    res.send(JSON.stringify(result));
});

server.post('/sendVote', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const requestData = req.body;
    
    const voteItem = {
        voteText: requestData.voteText,
        ciphergram: requestData.ciphergram,
    }

    const votesData = new VotesData(voteItem);

    VotesData.updateOne({ciphergram: voteItem.ciphergram}, voteItem)
    .then(dbRes => {
        if(dbRes.n === 0){
            console.log(`Vote ${voteItem.ciphergram} not found :/  Saving...`);
            votesData.save()
            .then(dbRes => {
                //
            })
        }
    });

    res.send(JSON.stringify({status: true}));
});

server.get('/vote-data', async (req, res) => {
    const obj = {};

    const result = await VoteData.find({}).exec();

    if(result){
        result?.forEach(item => {
            obj[item.name] = item.value;
    
            return obj;
        });
    }
    
    res.send(JSON.stringify(obj));
});

server.get('/key/:type', async (req, res) => {
    const type = req.params.type;

    const result = await KeysData.findOne({type}).exec();
    
    if(result){
        res.send(JSON.stringify(result));
    }
});

server.post('/key', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const requestData = req.body;
    const keysData = new KeysData(requestData);
        
    KeysData.updateOne({type: requestData.type}, requestData)
    .then(dbRes => {
        if(dbRes.n === 0){
            console.log(`${requestData.type} not found :/  Saving...`);
            keysData.save()
            .then(dbRes => {
                //
            })
        }
    });

    if(requestData){
        res.send(JSON.stringify({status: true}));
    }
});

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});