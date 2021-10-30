const jwt = require('jsonwebtoken');

exports.authAdmin = (req, res, next) => {
    const autHeader = req.headers.token;

    if (autHeader) {
        const token = autHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            err && res.status(401).json({success: false, message: 'Invalid Token'})
            !data.user.isAdmin && res.status(401).json({success: false, message: 'You are not UnAuthorized.'})

            req.user = data.user;

            next();
        })
    } else {
        res.json({success: false, message: 'Invalid Token'})
    }
}