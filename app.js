const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.send('sadf');
});

const port = 5000 || process.env.PORT;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});