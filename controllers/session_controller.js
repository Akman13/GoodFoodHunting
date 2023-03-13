const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const db = require("./../db");


router.get('/login', (req, res) => {
    res.render('login', {email: req.session.email})
})


router.delete('/sessions', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
})

router.post('/sessions', (req, res) => {
    const { email, password } = req.body;

    
    // Verify that the password is correct
    const sql = `SELECT * FROM users WHERE email=$1;`;
    db.query(sql, [email] , (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);
        
        } else if (dbRes.rows.length === 0) {
            // Email doesn't exist - stay at login page
            res.render('login');
            return

        } else {
            
            const user = dbRes.rows[0];

            bcrypt.compare(password, dbRes.rows[0].password_digest, (err, result) => {
            
                if (result) {
                    req.session.userID = user.id;
                    res.redirect('/');

                } else {
                    res.render('login');
                }

            })
        }
    })

})



module.exports = router;