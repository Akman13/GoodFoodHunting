const db = require("./../db/");


function setCurrentUser(req, res, next) {
    const {userID} = req.session;
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