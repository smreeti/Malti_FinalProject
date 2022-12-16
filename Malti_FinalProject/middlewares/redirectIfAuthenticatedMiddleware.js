/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/'); // if user is logged in, redirect to home page
    }

    next();
}