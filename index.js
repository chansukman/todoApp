var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://chansukman279:123123123@cluster0.m4liy0i.mongodb.net/?retryWrites=true&w=majority"

var DATABASENAME = "todoappdb";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database = client.db(DATABASENAME);
        console.log("Mongo DB connection seccessful");

    })  
})

app.get('/api/todoapp/GetNotes',(request,response)=>{
    database.collection("todocollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/todoapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("todocollection").count({},function(error,numOfDocs){
        database.collection("todocollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
            });
            response.json("Add successfully!");
    })
})

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    database.collection("todocollection").deleteOne({
        id:request.query.id
    });
    response.json("Delete successfully!")
})
