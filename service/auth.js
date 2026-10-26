// const sessionIdUserMap = new Map();
const jwt = require('jsonwebtoken');
const secretKey = "Ganesha$*#";
function setUser(user) {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, secretKey);

}
function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secretKey);
    }
    catch (err) {
        return null;
    }

}

module.exports = {
    setUser,
    getUser,
}