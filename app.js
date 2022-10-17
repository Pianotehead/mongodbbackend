const express = require("express");
const cors = require('cors');
const app = express();
const client = require("./db.js");
const {ObjectId} = require('mongodb');
const db = client.db();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get("/movies", async (req, res) => {
  try {
    const movies = await db.collection("movies").find().toArray();
    if (movies.length) {
      res.json(movies)
    } else {
      res.json("You do not currently have any movies in your movies collection.")
    }
  } catch (err) {
    console.log(err)
    res.json("Try again later.")
  }
})

app.post("/movies", async (req, res) => {
   const result = await db.collection("movies").insertOne(req.body);
   console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
   );
})

app.get("/quotes", async (req, res) => {
   try {
     const quotes = await db.collection("quotes").find().toArray();
     if (quotes.length) {
       res.json(quotes)
     } else {
       res.json("You do not currently have any quotes in your quotes collection.")
     }
   } catch (err) {
     console.log(err)
     res.json("Try again later.")
   }
 })

 app.get("/quotes/:id", async (req, res) => {
  try {
    const quote = await db.collection("quotes").findOne({ _id: ObjectId(req.params.id) });
    res.json(quote);
  } catch (err) {
    console.log(err)
  }
})
 
 app.post("/quotes", async (req, res) => {
    const result = await db.collection("quotes").insertOne(req.body);
    return res.redirect('/quotes');
 })

module.exports = app