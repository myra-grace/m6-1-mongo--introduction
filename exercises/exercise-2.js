const { MongoClient } = require('mongodb');
const assert = require('assert');

const createGreeting = async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db('exercises');
        const r = await debug.collection('greetings').insertOne(req.body);
        assert.equal(1, r.insertedCount);
        res.status(201).json({ status: 500, data: req.body, message: err.message });
    } catch (err) {
        console.log(err.stack);
    }
    client.close();
};

const getGreeting = async (req, res) => {
    const { _id } = req.params;
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db('exercises');

    db.collection('two').find({_id: _id.toUpperCase()}, (err, result) => {
        result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: 'Not Found' })
        client.close();
    });
}

const findMore = async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db('exercises');

    db.collection('two').find().toArray((err, result) => {
        if (result.length) {
            const first = Number(req.query.start) > -1 && Number(req.query.start) < result.length ? Number(req.query.start) : 0;
            const last = first + (Number(req.query.limit) || 25);
            const filterLast = last > result.length ? result.length -1 : last;
            const data = result.slice(filterFirst, filterLast);
            res.status(200).json({ status: 200, data });
        } else {
            res.status(404).json({ status: 404, data: 'Not Found' });
        }
        client.close();
    })
}

const deleteGreeting = async (req, res) => {
    const { _id } = req.params;

    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db('exercises');
        const r = await db.collection('two').deleteOne({ _id: _id.toUpperCase() });
        assert.equal(1, r.insertedCount);
        res.status(200).json({ status: 200, _id });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const updateGreeting = () => {
    const { _id } = req.params;
    const { hello } = req.body;

    if (!hello) {
        res.status(400).json({ status: 400, data: req.body, message: 'you may update "hello."',});
    } else {
        const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db('exercises');
        const query = { _id };
        const newValues = { $set: { ...req.body } };

        const r = await db.collection('two').updateOne(query, newValues);
        assert.equal(1, r.matchedCount);
        assert.equal(1, r.modifiedCount);
        res.status(200).json({ status: 200, _id, ...req.body });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
    }
}

module.exports = { createGreeting, getGreeting, findMore, deleteGreeting, updateGreeting,};