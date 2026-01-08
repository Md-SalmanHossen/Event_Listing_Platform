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

export const updateProfileImage = async (req, res) => {
  try {

    if(!req.file){
      return res.status(400).json({
        success:false,
        message:'No image uploaded'
      });
    }
    const imageUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { image:imageUrl },
      { new: true }
    ).select('-password');

    if(!user){
      return res.status(404).json({
        success:false,
        message:'User not found'
      })
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const roleToOrganizer=async(req, res)=>{
  try {
    const user=await User.findById(req.user.id);

    if(!user){
      return res.status(404).json({
        success:false,
        message:'User not found'
      })
    }

    if(user.role==='organizer'){
      return res.status(400).json({
        success:'false',
        message:'You are already an organizer'
      })
    }

    user.role='organizer';
    await user.save();

     res.status(200).json({
      success: true,
      message: "You are now an organizer",
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
