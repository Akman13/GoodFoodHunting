const express = require('express');
const db = require("./../db");



const router = express.Router();
const ensureLoggedIn = require('../middlewares/ensure-logged-in');


// When you out-source your route handlers into a separate module, you need to use router instead
// Then you just export 'router'
// Think of 'router' as being a group of route handlers
// You need to setup all the dependencies here for each one


router.get('/', (req, res) => {
    console.log(req.user);
    const sql = 'SELECT * FROM dishes;';

    db.query(sql, (dbErr, dbRes) => {
        const dishes = dbRes.rows;
        
        
        res.render('home', {dishes})
    })
    
})


router.get('/dishes/new', ensureLoggedIn, (req, res) => {
    res.render('new-dish', {email: req.session.email})
})


router.get('/dishes/:id', (req, res) => {
    
    const sql = `SELECT * FROM dishes WHERE id=$1;`;
    
    db.query(sql, [req.params.id] ,(dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const dish = dbRes.rows[0];
            res.render('details', {dish});
        }
        
    })
    
})


router.post('/dishes', ensureLoggedIn, (req, res) => {
    
    db.query(`INSERT INTO dishes (title, image_url, user_id) values ($1, $2, $3);`, [req.body.title, req.body.imgurl, req.session.userID] ,(err, dbRes) => {
        res.redirect('/')
    });

})


router.delete('/dishes/:id', ensureLoggedIn, (req, res) => {
    const sql = `DELETE FROM dishes WHERE id = $1;`;

    db.query(sql, [req.params.id] ,(err, dbRes) => {
        res.redirect("/");
    })
})


router.get('/dishes/:id/edit', ensureLoggedIn , (req, res) => {
    const dishID = req.params.id;
    const sql= `SELECT * FROM dishes WHERE id=$1;`
    
    db.query(sql, [dishID], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const dishTitle = dbRes.rows[0].title;
            const dishImgUrl= dbRes.rows[0].image_url;
            res.render('edit_dish', {dishTitle, dishImgUrl, dishID});
        }
    })
})


router.put('/dishes/:id', ensureLoggedIn , (req, res) => {
    const dish = {
        id: req.params.id,
        title: req.body.title,
        image_url: req.body.imgurl
    }

    const sql = `UPDATE dishes SET title=$1, image_url=$2 WHERE id=$3;`

    db.query(sql, [dish.title, dish.image_url, dish.id] ,(dbErr, dbRes) => {
        if(dbErr) {
            console.log('line 159', dbErr);
            process.exit(1);

        } else {
            console.log('This entry has been updated');
            res.redirect(`/dishes/${dish.id}`)
        }
    })
})

module.exports = router;