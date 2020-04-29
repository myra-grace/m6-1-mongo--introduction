const { MongoClient } = require('mongodb');

const dbFunction = async (dbName) => {
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    await client.connect();
    console.log('connected!');

    const db = client.db(dbName);

    await db.collection('one').insertOne({ name: 'Steve Rogers' });

    client.close();
    console.log('disconnected!');
};


dbFunction('exercise_one');