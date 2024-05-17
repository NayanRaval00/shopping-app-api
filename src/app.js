const express = require('express');
var routes = require('./routers/route');
const bodyParser = require("body-parser");
require('dotenv').config();
require("./db/conn")

const app = express();

console.log(process.env.PORT,'process.env.PORT');
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(routes);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})