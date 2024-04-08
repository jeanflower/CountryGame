//See https://www.npmjs.com/package/mongodb

import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URI;
console.log(`got URI ${url}`);

const client = new MongoClient(url);

// Database Name
const dbName = 'crudExample';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  const insertResult = await collection.insertMany(
    [
      { a: 1, b: 10 },
      { a: 2, c: 10 },
      { a: 3, d: { e: 10, f: 10}, },
    ]
  );
  console.log('Inserted documents =>', insertResult);

  let findResult = await collection.find({}).toArray();
  console.log('All documents =>', findResult);

  let filteredResult = await collection.find({a: 3}).toArray();
  console.log('Filtered documents =>', filteredResult);

  const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 99 } });
  console.log('Updated documents =>', updateResult);

  filteredResult = await collection.find({a: 3}).toArray();
  console.log('Filtered documents =>', filteredResult);

  const deleteResult = await collection.deleteMany({ a: 3 });
  console.log('Deleted documents =>', deleteResult);

  findResult = await collection.find({}).toArray();
  console.log('All documents =>', findResult);

  return 'done.';
}

try {
  console.log('starting work on mongo example');
  const message = await main();
  console.log(message);
  console.log('finished try block for mongo example');
} catch (error) {
  console.error(error);
} finally {
  client.close();
}
