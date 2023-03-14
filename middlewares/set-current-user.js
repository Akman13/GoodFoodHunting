const db = require("../db");

// Used to store the current user details into res.locals for use by the templates
function setCurrentUser(req, res, next) {
    const {userID} = req.session;
    console.log(`Line6 of set-current-user. rq.session:`);
    console.log(req.session);
    res.locals.currentUser = {};

    if (userID) {
        const sql = `SELECT id, email FROM users WHERE id = ${userID};`;
        
        db.query(sql, (dbErr, dbRes) => {
            if(dbErr) {
                console.log(dbErr);
                process.exit(1);
            } else {
                res.locals.currentUser = dbRes.rows[0];
                next();
            }
        })
        
    } else {
        next();
    }
}

module.exports = setCurrentUser;