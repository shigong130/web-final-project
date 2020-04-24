module.exports = function(req, res, next) {
    const email = req.session.email;
    const isAdministrator = req.session.isAdministrator;

    if (!email) {
        return res.status(401).send('Unauthorized: No session available');
    } else {
        req.email = email;
        req.isAdministrator = isAdministrator;
        next();
    }}