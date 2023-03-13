function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
        if (req.session.userID) {
            return true;
        } else {
            return false;
        }
    }

    res.locals.isUniqueEmail = true;
    console.log('Just made res.locals.isUniqueEmail = true');

    next ();
}

module.exports = viewHelpers;