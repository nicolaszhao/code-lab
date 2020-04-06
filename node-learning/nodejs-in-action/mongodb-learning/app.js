const { MongoClient, ObjectID } = require('mongodb');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// MongoClient.connect(url)
//   .then(client => {
//     const db = client.db('xxx');
//     console.log(`client ready`);
//     db.collection('articles').insertMany([{b: 1}, {b: 2}])
//       .then(ret => {
//         console.log(`Inserted ok!, result: `, ret);
//         client.close();
//       });
//   }, console.error);

// // Database Name
// const dbName = 'myproject';

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   // insertDocuments(db, (r) => {
//   //   console.log('result: ', r);
//   //   client.close();
//   // })

//   findDocuments(db, () => client.close());
// });

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('articles');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Find some documents
//   collection.find({a:1}).toArray(function(err, docs) {
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }

const id = new ObjectID('5e2cf34569e65e171a0f1b36');
console.log(id.getTimestamp());
