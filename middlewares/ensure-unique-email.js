const db = require("./../db/");
const recordNewUser = require('./create-user')

// On the server side: Check if the email is already in the database. If it is, render the sign-up page again with a warning text
// On the server side: If it's valid, call the encryptor to digest their pw, then store the data

function ensureUniqueEmail(req, res, next) {
    const { email, password } = req.body;
    const sql = `SELECT id FROM users WHERE LOWER(email)=LOWER($1);`;
    console.log(`ensure unique email. SQL: ${sql}, email: ${email}, password: ${password}`);

    db.query(sql, [email], (dbErr, dbRes) => {
        console.log(`dbRes.rowCount from line 13 of unique-email is:`);
        console.log(dbRes.rowCount);
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else if (dbRes.rowCount > 0) {
            console.log(`Line 20 of ensure-unique-email. dbRes.rowCount: ${dbRes.rowCount}`);
            const message = 'This email is already registered. Please use a different email';
            console.log('Email already exists');
            res.locals.isUniqueEmail = false;
            res.render('register', {message});

        } else if (dbRes.rowCount === 0) {
            console.log(`Line 25 of ensure-unique-email. dbRes.rowCount: ${dbRes.rowCount}`);
            next();
        }
    })
}

module.exports = ensureUniqueEmail;


// Middleware function that checks the db
// If unique, it returns next() to the route handler, allowing it to continue with the CB function inside it
// If not unique, it renders the page again with a message 