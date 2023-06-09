const {
    MongoClient,
    ServerApiVersion,
    ObjectId
} = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hcsitps.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/**
 * ------------------------- Verify Token --------------------------
 */
const verifyToken = (req, res, next) => {
    console.log('I am outside verifyToken()');
    // console.log(req.headers.authorization);
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error : true, message : 'Unauthorized Access'});
    }
    const token = authorization.split(' ')[1];
    console.log(token);
    // Verify Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ error : true, message : 'Unauthorized Access'});
        }
        req.decoded = decoded;
        next();
    });

}



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // client.connect();

        const serviceCollection = client.db('carDoctor').collection('services');
        const bookingCollection = client.db('carDoctor').collection('bookings');

        /**
         *                      JWT
         * ----------------------------------------------------------
         */
        app.post('/jwt', (req, res) => {
            const user = req.body;
            // console.log('jwt ', user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            res.send({token});
        });

        /**
         *                      Services
         * ----------------------------------------------------------
         */
        // READ (MULTIPLE)
        app.get('/services', async (req, res) => {
            // Sorting
            const sort = req.query.sort;
            const search = req.query.search;

            // Conditional Operator of MongoDB
            // const query = { price : {$gt : 50}};

            // Search form DB using MongoDB
            const query = {
                title : {
                    $regex : search,
                    $options : "i"
                }
            };


            const options = {
                sort: {
                    "price" : sort=== 'asc' ? 1 : -1
                }
            };
            const cursor = serviceCollection.find(query, options);
            const result = await cursor.toArray();
            res.send(result);
        });

        // CHECKOUT
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('I got the ', id);

            const query = {
                _id: new ObjectId(id)
            };
            const options = {
                projection: {
                    title: 1,
                    service_id: 1,
                    price: 1,
                    img: 1,
                },
            };
            const result = await serviceCollection.findOne(query, options);
            res.send(result);
        });

        /**
         *                      Bokkings
         * ----------------------------------------------------------
         */

        // READ
        app.get('/bookings', verifyToken, async (req, res) => {
            // console.log(req.query);
            // console.log(req.headers.authorization);
            const decoded = req.decoded;
            // console.log(decoded.email);
            if (decoded.email !== req.query.email) {
                return res.status(403).send({error : true, message : 'Unauthorized Access'});
            }

            let query = {};
            if (req.query?.email) {
                query = {
                    email: req.query.email
                }
            }
            const result = await bookingCollection.find(query).toArray();
            res.send(result);
        });


        // CREATE
        app.post('/bookings', async (req, res) => {
            const bookings = req.body;
            console.log(bookings)
            const result = await bookingCollection.insertOne(bookings);
            res.send(result);
        });

        // UPDATE 
        app.patch('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const updateStatus = req.body;
            console.log(id, updateStatus);
            const query = {
                _id: new ObjectId(id)
            };
            const updateBooking = {
                $set: {
                    status: updateStatus.status
                }
            };
            const result = await bookingCollection.updateOne(query, updateBooking);
            res.send(result);
        });

        // DELETE
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        });



        // Send a ping to confirm a successful connection
        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => res.send('Bismillahir Rahmanir Rahim'));
app.listen(port, () => console.log(`Server is running from port : ${port}`));