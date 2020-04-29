const { MongoClient } = require('mongodb');
const fileSystem = require('file-system');
const assert = require('assert');
const greetings = JSON.parse(fileSystem.readFileSync('data/greetings.json'));


const batchImports = async () => {
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db('exercises');
        const r = await debug.collection('greetings').insertMany(greetings);
        assert.equal(greetings.length, r.insertedCount);
        console.log('greetings');

    } catch (err) {
        console.log(err.stack);
    }
    client.close();
}

batchImports();