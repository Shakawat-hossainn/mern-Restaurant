import { User } from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  if (
    (!username || !password || !email || username === "",
    email === "",
    password === "")
  ) {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email is already in use"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    const { password: pass, ...rest } = newUser._doc;
    res.status(201).json({
      rest,
    });
  } catch (error) {
    next(error);
  }
};

const login =async(req,res,next)=>{
    const {email, password} = req.body;
  if(!email ||!password){
    return next(errorHandler(400,'All fields are required'))
  }
    try {
        const user = await User.findOne({email})
        if(!user){
            return next(errorHandler(400,'Invalid email or password'))
        }
        const isMatch = bcryptjs.compareSync(password,user.password)
        if(!isMatch){
            return next(errorHandler(400,'Invalid email or password'))
        }
        const {password:pass,...rest} = user._doc
             const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
if (!token) {
    console.error('Error generating JWT token');
    return next(errorHandler(500, 'Internal Server Error'));
}
        res.cookie('access_token',token,{
        httpOnly: true,
          secure:true
        })
        res.status(200).json({
            rest
        })
    } catch (error) {
        next(error)
    }

}
const signout = (req, res) => {
  res.clearCookie('access_token');
  res.status(200).json({ message: 'User signed out successfully' });
}

export { signup,login,signout };
