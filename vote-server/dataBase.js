import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { MongoClient } = require("mongodb");

export default class MongoDB{
    constructor(uri, dbName){
        this.dbURI = uri;
        this.dbName = dbName;
    }
    async get(collection, query){
        try {     
            this.openConnection(collection);
            
            const dbCollection = this.createCollection(collection);

            const searchResult = await dbCollection.findOne(query);
            
            return searchResult;
        } finally {
            await this.closeConnection();
        }
    }
    async put(collection, doc){
        try {
            await this.openConnection(collection);
        
            const dbCollection = this.createCollection(collection);

            const insert = await dbCollection.insertOne(doc);
            
            return insert.insertedId;
        } finally {
            await this.closeConnection();            
        }
    }
    async replace(collection, query, doc){

    }
    createCollection(collection){
        this.database = this.dbClient.db(this.dbName);

        return this.database.collection(collection);
    }
    async openConnection(collection){
        
        this.dbClient = MongoClient(this.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        await this.dbClient.connect();
    }
    async closeConnection(){
        await this.dbClient.close();
    }
}



// async function run() {
//     try {
//         await dbClient.connect();
//         const database = dbClient.db('vote_db');
//         const collection = database.collection('vote_data');

//         const obj = {title: 'hi'};

//         const res = await collection.insertOne(obj);

//         const id = res.insertedId;

//         const query = {_id: id};

//         const find = await collection.findOne(query);

//         console.log(find);
//     } finally {
//         await dbClient.close();
//     }
// }

// run().catch();