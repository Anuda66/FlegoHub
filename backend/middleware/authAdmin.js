import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
  
    const aToken = req.headers['atoken'] || req.headers.aToken;

    if (!aToken) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized, login again' 
        });
    }

    try {
        const decoded = jwt.verify(aToken, process.env.JWT_SECRET);
        req.adminId = decoded.id; 
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

export default authAdmin;