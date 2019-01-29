const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Load user model
require('./models/User');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');

//Load keys
const keys = require('./config/keys');

mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
    res.send('sadf');
});

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});