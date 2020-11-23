const express = require('express');
const app = express();
//const mysql = require('mysql');
const dotenv = require('dotenv');
require("dotenv").config();

app.use(express.json());

const authRoute = require('./api/users/router');
app.use('/api/user', authRoute);
app.listen(process.env.APP_PORT, () => {
    console.log("server running on port: ", process.env.APP_PORT);
});