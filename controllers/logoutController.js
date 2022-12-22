/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

module.exports = { logout };