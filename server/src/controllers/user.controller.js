import User from "../models/User.model.js";
import generateToken from '../utils/generate_token.utils.js'


export const signup = async (req, res) => {
  try {
    const { name, email, password ,role} = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if(!user){
      return res.status(401).json({
        success:false,
        message:'Invalid credentials'
      })
    }

    const comparePass=await user.comparePassword(password);

    if (!comparePass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getProfile = async (req, res) => {
  try {

    const id=req.user.id;
    const user = await User.findById(id).select('-password');

    if(!user){
      return res.status(404).json({
        success:false,
        message:'User not found'
      })
    }

    res.status(200).json({
      success: true,
      user
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   UPDATE PROFILE IMAGE
====================== */
export const updateProfileImage = async (req, res) => {
  try {
    const image = req.file?.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { image },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
