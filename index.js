const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(cors());
app.use(express.json());

//---------------------

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wd6nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//---------------------

async function run(){
    try{

        await client.connect();

        const database = client.db('travel-booking');
        const users = database.collection('users');
        const result = await users.insertOne({name: 'aal emraaan', age: 24});
        res.send(result);


    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir());

app.listen(port, () => {
    console.log('listening to port: ' , port)
})



// git repository

// https://github.com/programming-hero-web-course1/tourism-or-delivery-website-server-side-Aal-Emraan