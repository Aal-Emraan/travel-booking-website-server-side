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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//---------------------

async function run(){
    try{

        await client.connect();

        const database = client.db('travel-booking');
        const users = database.collection('users');
        const plans = database.collection('plans');
        const myOrders = database.collection('orders');

        app.get('/', (req, res) => {
            res.send('hwllo');
            console.log("boor");
        })
        
        // get all plans
        app.get('/tours', async (req,res) => {
            const allPlans = await plans.find({}).toArray();
            res.send(allPlans);
        })

        // get all orders
        app.get('/manageallbookings', async (req, res) => {
            const allOrders = await myOrders.find({}).toArray();
            res.send(allOrders);
        })

        // add new plans
        app.post('/addnewplan', async(req, res) => {
            console.log(req.body);
            const result = await plans.insertOne(req.body);
            res.send(result)
        })

        // post orders to database
        app.post('/order', async (req, res) => {
            const result = await myOrders.insertOne(req.body);
            // console.log(req.body);
            res.send(req.body)
        })


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