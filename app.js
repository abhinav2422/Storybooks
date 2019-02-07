const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Load user model
require('./models/User');
require('./models/Story');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

//Load keys
const keys = require('./config/keys');

//Handlebars helpers
const {
    truncate, 
    stripTags,
    formatDate,
    select,
    editIcon
} = require('./helpers/hbs');

//Map global promises
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


//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method Override Middleware
app.use(methodOverride('_method'));

//Handlebars Middleware
app.engine('handlebars', exphbs ({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

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

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});