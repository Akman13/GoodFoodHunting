const express = require('express');
const router = express.Router();
const createNewUser = require('../middlewares/create-user');
const setCurrentSession = require('./../middlewares/set-current-session');


const db = require("./../db");
const ensureUniqueEmail = require('./../middlewares/ensure-unique-email');


router.get('/users', (req, res) => { // A list of users
    res.json(`You're at the router.get`);
});

router.post('/users', ensureUniqueEmail, createNewUser, setCurrentSession, (req, res) => { // Create a user
    console.log('First line of the POST router (line 15)');

    // const { email, password } = req.body;
    // createNewUser(email, password); 
    // res.locals.isUniqueEmail = true;
    // console.log('Line20 of ensure unique email');
    
    // const sql = `SELECT * FROM users WHERE email='${email}';`;
    // console.log(`line 23 email: ${email}`);
    
    // db.query(sql, (dbErr, dbRes) => {
    //     if (dbErr) {
    //         console.log(dbErr);
    //         process.exit(1);

    //     } else {
    //         console.log(dbRes);
    //         // res.json(dbRes.rows[0]);
    //         // req.session.userID = dbRes.rows[0].id;
    //         // console.log(req.session);
    //     }
    // })


    res.redirect('/');

}); 


router.delete('/users/:id'); // Delete a user
router.put('/users/:id'); // Update a user

router.get('/users/signup', (req, res) => { // Get a new-user form
    res.render('register');
}); 

router.get('/users/:id'); //Get a user's details

module.exports = router;