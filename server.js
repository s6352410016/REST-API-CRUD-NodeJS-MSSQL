const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000 , () => {
    console.log('Starting server...');
})