const db = require("../db");

// Middleware function used to reset the current Session to the newly registered user
function setCurrentSession(req, res, next) {
    // if (req.session) {
    //     req.session.destroy(() => {
    //         res.redirect('/login');
    //     });
    // }
    
    
    const sql = `SELECT id, email FROM users WHERE email = $1;`;
        
    db.query(sql, [req.body.email] ,(dbErr, dbRes) => {
        if(dbErr) {
            console.log(dbErr);
            process.exit(1);
        } else {
            console.log(`Line19 of set-current-session. req.session is:`);
            console.log(req.session);
            req.session.userID = dbRes.rows[0].id;
            // res.locals.currentUser = dbRes.rows[0];
            next();
        }
    })
    
}

module.exports = setCurrentSession;