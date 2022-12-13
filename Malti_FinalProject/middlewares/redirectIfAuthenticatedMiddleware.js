module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/'); // if user is logged in, redirect to home page
    }

    next();
}