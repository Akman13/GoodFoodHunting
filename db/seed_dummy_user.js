const { Client } = require('pg'); // Need to save to the database

const bcrypt = require('bcrypt');

const db = new Client( {
    database: 'goodfoodhunting',
    user: 'postgres',
    password: process.env.POSTGRES_PW,
});
db.connect();

// const email = 'dt@ga.co';
// const plainTextPassword = "pudding";

function recordNewUser(email, plainPassword) {

    bcrypt.genSalt(10, (err, salt) => {
    
        bcrypt.hash(plainPassword, salt, (hashErr, digestedPassword) => {
        
            const sql = `INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPassword}')`;
    
            db.query(sql, (dbErr, dbRes) => {
                if (dbErr) {
                    console.log(dbErr);
                    process.exit(1);
    
                } else {
                    console.log('It got added');
                    db.end();
                }
            })
        })
    })

}

module.exports = recordNewUser;