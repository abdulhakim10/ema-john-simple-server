const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.47nvmfs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const productCollection = client.db('emaJohn').collection('products');

        
        app.get('/products', async(req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, (req, res) => {
    console.log(`server running on port ${port}`);
})