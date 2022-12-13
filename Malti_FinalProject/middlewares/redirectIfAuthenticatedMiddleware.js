module.exports = (req, res, next) => {
    if (!req.session.loggedInId) {
        return res.redirect('/'); // if user is logged in, redirect to home page
    }

    next();
}