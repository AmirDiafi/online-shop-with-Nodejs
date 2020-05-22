exports.isAuth = (req, res, next) => {
    if(req.session.userId) next()
    else res.redirect('/signin')
}
exports.isNotAuth = (req, res, next) => {
    if(!req.session.userId) next()
    else res.redirect('/')
}