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
            await this.openConnection();
            
            const dbCollection = this.createCollection(collection);

            const searchResult = await dbCollection.findOne(query);
            
            return searchResult;
        } finally {
            await this.closeConnection();
        }
    }
    async getMany(collection, query){
        try {
            await this.openConnection();
            
            const dbCollection = this.createCollection(collection);

            const searchResult = await dbCollection.find(query).toArray();

            return searchResult;
        } finally {
            await this.closeConnection();
        }
    }
    async put(collection, doc){
        try {
            await this.openConnection();
        
            const dbCollection = this.createCollection(collection);

            const insert = await dbCollection.insertOne(doc);
            
            return insert.insertedId;
        } finally {
            await this.closeConnection();
        }
    }
    async replace(collection, query, doc){
        try {
            await this.openConnection();

            const dbCollection = this.createCollection(collection);

            await dbCollection.findOneAndReplace(query, doc)
            .then(replacedDoc => {
                if(replacedDoc){
                    return replacedDoc;
                }
                else{
                    console.log(':/');
                }

                this.closeConnection();
            })
            .catch(err => {
                console.log(err);
            });
        } finally {
            await this.closeConnection();
        }

    }
    createCollection(collection){
        this.database = this.dbClient.db(this.dbName);

        return this.database.collection(collection);
    }
    async openConnection(){
        
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