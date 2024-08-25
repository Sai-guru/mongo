const express = require('express')
const { MongoClient } = require('mongodb')

const app = express()

const client = new MongoClient("mongodb://localhost:27017/")

async function connect() {
    try {
        console.log('Connecting to MongoDB...')
        await client.connect();
        console.log('Connected to MongoDB')
        return client.db('mongo_practice');
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
        
    }
}

// create the user 
app.post("/users", async (req, res) => {
    try {
        console.log('Creating user...')
        const db = await connect();   //connect to the database
        const collection = db.collection("users");
        const result = await collection.insertOne({ "_id": 44, "name": "jcnfnffnjne", "age": 33 })
        console.log('User created', result)
        res.send("user created");
    } catch (error) {
        console.log('Error creating user', error)
        res.status(500).send("Error creating user");
    }
})
//fetching the users which we given 
app.get("/users", async (req, res) => {
    const db = await connect();
    const collection = db.collection("users");
    const data = await collection.find({}).toArray();
    res.send(data);
}) 
//update the user
app.put("/users", async (req, res) => {
    const db = await connect();
    const collection = db.collection("users");
    const result = await collection.updateOne({ name: "jcnfnffnjne" }, { $set: {name : "prigeesh"} });
    res.send("user updated");
})

//delete the user
app.delete("/users", async (req, res) => {
    const db = await connect();
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id :94 });
    res.send("user deleted");
    });

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(4000, () => {
    console.log("server is running on port 4000");
})