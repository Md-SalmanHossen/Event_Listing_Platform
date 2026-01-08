import  jwt  from 'jsonwebtoken';

const generateToken=(user)=>{
   try {

      const token=jwt.sign(
         {id:user._id,role:user.role ||'user'},
         process.env.JWT_SECRET,
         {expiresIn:'7d'}
      )
      return token;
      
   } catch (error) {
      res.status(500).json({
         status:'fail',
         error:error.message
      })
   }
}
export default generateToken;