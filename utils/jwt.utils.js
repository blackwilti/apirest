const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '00x23klhjhkgkgjf22lklvb505jgkkhkgkgk65hjh9jhh4jh5yytyftf';

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            
        },
        JWT_SIGN_SECRET , {
            expiresIn: '1h'
        })
    }
}