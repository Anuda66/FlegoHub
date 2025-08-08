import jwt from 'jsonwebtoken';
 
const authUser = (req, res, next) => {
  
    const token = req.headers['token'] || req.headers.token;

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized, login again' 
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        next();
    }
    catch (error) {
        console.log(error);
        
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token' 
        });
    }
};

export default authUser;