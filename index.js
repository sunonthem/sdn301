import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const dbname = "conFusion";

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbname);
    const collection = db.collection("dishes");

    // Insert a document
    const insertResult = await collection.insertOne({
      name: "Uthappizza",
      description: "test",
    });
    console.log("After Insert:\n");
    console.log(insertResult.insertedId);

    // Find all documents
    const docs = await collection.find({}).toArray();
    console.log("Found:\n");
    console.log(docs);

    // Uncomment the following lines to drop the collection
    // const dropResult = await db.dropCollection("dishes");
    // console.log("Dropped collection:", dropResult);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
