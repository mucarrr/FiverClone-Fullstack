import jwt from "jsonwebtoken";

export const protect = async(req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized - No token found " 
        });
    }
    try{
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.isSeller = decoded.isSeller;
      req._id = decoded.id;  // decoded._id yerine decoded.id
      next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token"
        });
    }
}