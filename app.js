const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    res.send('sadf');
});

//Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});