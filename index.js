const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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

        // get my orders
        app.get('/bookings/:email', async(req, res) => {
            // const query = {email: req.params.email};
            const result = await myOrders.find({email: req.params.email}).toArray();
            // console.log(result);
            res.send(result);
        })


        //update status 
        app.put('/status/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: true };
            // create a document that sets the plot of the movie
            const updateDoc = {
              $set: {
                status: `Approved`
              },
            };
            const result = await myOrders.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // delete bookings
        app.delete('/delete/:id', async(req, res) =>{
            const id = req.params.id;

            const query = {_id: ObjectId(id)};
            const result = await myOrders.deleteOne(query);
            res.send(result)
        })

        // add new plans
        app.post('/addnewplan', async(req, res) => {
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


// heroku link: https://dry-beach-57081.herokuapp.com/