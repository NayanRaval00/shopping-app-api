const express = require('express');
const authRoutes = require('./routers/auth.js');

const bodyParser = require("body-parser");
require('dotenv').config();
require("./db/conn")

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

// routes
app.use('/user', authRoutes);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})