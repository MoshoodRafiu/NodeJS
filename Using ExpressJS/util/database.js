const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = 'mongodb+srv://devrom:Ks4PSITLN5lcVElS@cluster0.sx7id.mongodb.net/shop?retryWrites=true&w=majority';

let _db;

const mongoConnect = (callback) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err;
        _db = client.db();
        callback(client);
    });
}

const getDb = () => {
    if (_db){
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;