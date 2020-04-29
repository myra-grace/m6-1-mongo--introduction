const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
    const { dbName, collection } = req.params;

    const client = new MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });

    await client.connect();

    const db = client.db(dbName);

    db.collection(collection)
    .find()
    .toArray((err, data) => {
        if (err) {
            res.status(404).json({ status: 404, data: 'No Data' });
        } else {
            res.status(200).json({ status: 200, data: data });
        }
    });
};

module.exports = { getCollection };