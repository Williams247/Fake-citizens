// Node modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const connectMongoDBSession = require('connect-mongodb-session')(expressSession);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');

// Express instance
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Session store
const sessionStore = new connectMongoDBSession({
    uri: 'mongodb://localhost:27017/fake-citizens',
    collection: 'user'
});

app.use(expressSession({
    secret: 'app secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

// Flash messager
app.use(flash());

// Set cores
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    next()
});

// Set static assests
app.use(express.static(path.join(__dirname, 'public')));

// Log requests via morgan
app.use(morgan('dev'));

// Local imports
const signup = require('./routes/signup');
const login = require('./routes/login');
const homePage = require('./routes/home');
const docs = require('./routes/docs');
const settings = require('./routes/settings');
const profile = require('./routes/profile');
const helpCenter = require('./routes/help-center');
const subscription = require('./routes/subscription');
const userId = require('./routes/user-id');
const nigeria = require('./api/continents/africa/nigeria/nigeria');
const sample = require('./api/sample/sample');

// App routes
app.use(signup);
app.use(login);
app.use(homePage);
app.use(docs);
app.use(settings);
app.use(profile);
app.use(helpCenter);
app.use(subscription);
app.use(userId);

// API's
app.use(sample);
app.use(nigeria);

// Port
const port = process.env.PORT || 8000;

// Run server when the app connects to the database
mongoose.connect('mongodb://localhost:27017/fake-citizens')
    .then(() => {
        app.listen(port, () => {
        console.log('Development server: http://localhost:' + port)
    })
}).catch(error => console.log(error));
