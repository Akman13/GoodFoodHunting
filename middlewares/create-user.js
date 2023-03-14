const db = require("../db");
const bcrypt = require('bcrypt');


// Creates a user and stores their email and digested password into the database.
function recordNewUser(req, res, next) {
    
    const { email, plainPassword } = req.body;
    
    bcrypt.genSalt(10, (err, salt) => {
    
        bcrypt.hash(plainPassword, salt, (hashErr, digestedPassword) => {
        
            const sql = `INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPassword}')`;
    
            db.query(sql, (dbErr, dbRes) => {
                if (dbErr) {
                    console.log(dbErr);
                    process.exit(1);
    
                } else {
                    console.log('It got added');
                    next();
                }
            })
        })
    })
}



module.exports = recordNewUser;