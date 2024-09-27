const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your_default_secret_key'; // Use environment variable

const generateToken = (user) => {
    const payload = { 
        id: user.id, 
        email: user.email
    };
    
    const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });
    
    return token;
};

const authenticateToken = (req, res, next) => {
    // Check for token in headers
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader?.split(' ')[1];

    // Check for token in cookies
    const tokenFromCookies = req.cookies?.token;

    // Use token from header if available, otherwise use token from cookies
    const token = tokenFromHeader || tokenFromCookies;

    if (!token) return res.status(401).json({ error: 'No token provided' });

    try{
        const user = jwt.verify(token, secretKey);
        req.user = user;
        req.userId = user.id;
        console.log(req.user);
        console.log(req.userId);

        next();
    }catch(err){
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = { authenticateToken, generateToken };