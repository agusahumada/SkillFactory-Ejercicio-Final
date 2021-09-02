const jwt = require('jsonwebtoken');
require('dotenv').config();

// middleware to validate token
const verifyToken = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.send('Acceso denegado')
    }else{
        jwt.verify(token, rocess.env.SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.json({auth: false, message: "la autenticacion falló"})
            }else{
                return req.userId = decoded.id;
            }
        })
    }
}

module.exports = verifyToken;