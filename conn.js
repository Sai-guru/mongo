const { MongoClient } = require('mongodb')
const client = new MongoClient("mongodb://localhost:27017/")

async function connect() {
    try {
        console.log('Connecting to MongoDB...')
        await client.connect()
        console.log('Connected to MongoDB')
        return client.db('mongo_practice')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

module.exports = { connect }