const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3005;

const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const { Pool } = require('pg');
const db = require('./db')




app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));



const logger = require('./middlewares/logger');
const methodOverride = require('./middlewares/method-override');

const sessionController = require('./controllers/session_controller');
const dishController = require('./controllers/dish_controllers');
const currentUser = require('./middlewares/current-user');
const viewHelpers = require('./middlewares/view-helpers');

app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride);

app.use(currentUser);


app.use(viewHelpers);
app.use("/", sessionController);
app.use("/", dishController);


app.listen(port, () => {
    console.log(`You are listening at port ${port}`)
})