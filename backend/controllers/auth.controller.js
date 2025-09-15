




import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import transporter from "../config/email.js";

export const sighUp=async (req,res) => {
    try {
        let {name,email,password} = req.body
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User is already exist"})
        }
        let hashPassword = await bcrypt.hash(password,10)

    //    OTP generate
    let otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.create({
      name,
      email,
      password: hashPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000, // 5 min
    });

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your Email - home rental website",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.status(201).json({
      message: "Signup successful, please verify your email",
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: `signup error ${error}` });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Email verified successfully", user });
  } catch (error) {
    return res.status(500).json({ message: `verifyOtp error ${error}` });
  }
};

  
export const login = async (req,res) => {
    try {
        let {email,password} = req.body
        let user= await User.findOne({email}).populate("listing","title image1 image2 image3 description rent category city landMark")
        if(!user){
            return res.status(400).json({message:"User is not exist"})
        }

        //  Email verified check
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect Password"})
        }
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            
           

            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000


        })
        return res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json({message:`login error ${error}`})
    }
    
}
export const logOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout error ${error}`})
    }
}