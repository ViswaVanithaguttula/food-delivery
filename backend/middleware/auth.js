//to decode the token we will use middleware


/*
import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
    // this function is for decoding token into id
    const authHeader = req.headers.authorization;
    const token = req.headers.token;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token = authHeader.split(" ")[1]; // Bearer TOKE
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export default authMiddleware;

*/


import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        // Accept token from BOTH formats
        const authHeader = req.headers.authorization || req.headers.token;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // If using Bearer token
        let token = authHeader;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
