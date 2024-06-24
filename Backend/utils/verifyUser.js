import errorHandler from "./error.js"
import jwt from 'jsonwebtoken'


const verifyToken =(req,res,next)=>{
    console.log('JWT Secret:', process.env.JWT_SECRET);

    //console.log('Verifying token...');
    // console.log(req.cookies)

    // Check if token is in cookies
    const token = req.cookies.access_token;
    // console.log('Token from cookies:', token);

if(!token){
    next(errorHandler(401,'Unauthorized'));

}
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{  // in this line user is the decoded information of the token
    if(err){
        next(errorHandler(401,'Unauthorized'));
    }
    req.user = user;
    next()

})



}

export default verifyToken;
