const routeHandler=(req ,res ,next)=>{
   try {
      res.status(404).json({
         status:'Not found',
         message:"Route not found"
      })
   } catch (error) {
      res.status(500).json({
         message:'Server internal error',
         error:error.message
      })
   }
}
export default routeHandler;