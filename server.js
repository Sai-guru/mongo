const express = require('express')
const app = express()
const { connect } = require('./conn')

async function startServer() {
    try {
        const db = await connect()
        console.log('Connected to DB')

        // create the user 
        app.post("/users", async (req, res) => {
            try {
                console.log('Creating user...')
                const collection = db.collection("users");
                const result = await collection.insertOne({ "_id": 25, "name": "saiguru", "age": 18 })
                console.log('User created', result)
                res.send("user created");
            } catch (error) {
                console.log('Error creating user', error)
                res.status(500).send("Error creating user");
            }
        })
        //fetching the users which we given 
        app.get("/users", async (req, res) => {
            const collection = db.collection("users");
            const data = await collection.find({}).toArray();
            res.send(data);
        }) 
        //update the user
        app.put("/users", async (req, res) => {
            const collection = db.collection("users");
            const result = await collection.updateOne({ name: "kaaaaa" }, { $set: {name : "prigeesh"} });
            res.send("user updated");
        })

        //delete the user
        app.delete("/users", async (req, res) => {
            const collection = db.collection("users");
            const result = await collection.deleteOne({ _id :44 });
            res.send("user deleted");
            });

        app.get('/', (req, res) => {
            res.send("Hello World");
        })

        app.listen(4000, () => {
            console.log("server is running on port 4000");
        })
    } catch (error) {
        console.log('Error starting server', error)
    }
}

startServer()
