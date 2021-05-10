import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mongoose = require("mongoose");

export default class MongoDB{
    constructor(uri, dbName){
        this.dbURI = uri;
        this.dbName = dbName;

        mongoose.connect(this.dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(succ => console.log('Connected to database!'))
        .catch(err => console.log('Failed to connect database!'));
    }
    async get(){
    }
    async put(){
    }
}