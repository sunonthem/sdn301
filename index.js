// import pkg from "mongodb";
const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const dboper = require('./operation');
const dbname = 'conFusion';

const client = new MongoClient(url);
// async function main() 
MongoClient.connect(url).then((client)=>{

    // await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    dboper.insertDocument(
        db,
        { name: "Vadonut", description: "Test" },
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));


        // (result) => {
        //     console.log("Insert Document:\n", result.ops);

        //     dboper.findDocuments(db, "dishes", (docs) => {
        //         console.log("Found Documents:\n", docs);

        //         dboper.updateDocument(
        //             db,
        //             { name: "Vadonut" },
        //             { description: "Updated Test" },
        //             "dishes",
        //             (result) => {
        //                 console.log("Updated Document:\n", result.result);

        //                 dboper.findDocuments(db, "dishes", (docs) => {
        //                     console.log("Found Updated Documents:\n", docs);

        //                     db.dropCollection("dishes", (result) => {
        //                         console.log("Dropped Collection: ", result);

        //                         client.close();
        //                     });
        //                 });
        //             }
        //         );
        //     });
        // }
    

    // Insert a document
    // const insertResult = await collection.insertOne({
    //   name: "Uthappizza",
    //   description: "test",
    // });
    // console.log("After Insert:\n");
    // console.log(insertResult.insertedId);

    // // Find all documents
    // const docs = await collection.find({}).toArray();
    // console.log("Found:\n");
    // console.log(docs);

    // // Uncomment the following lines to drop the collection
    // // const dropResult = await db.dropCollection("dishes");
    // // console.log("Dropped collection:", dropResult);


// main()
