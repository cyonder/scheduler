require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

require('./models/user');
require('./models/service');

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const serviceRoutes = require('./routes/servicesRouter');

app.use('/services', serviceRoutes);

mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is open to mongodb://127.0.0.1:27017/schedular');
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection has occured ${err} error`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

app.listen(PORT, () => {
    console.log(`Express server is running on Port: ${PORT}`);
});