import axios from "axios";

const API=axios.create({
   BASE_URL:process.env.BASE_URL;
});

API.interceptors.request.use((req)=>{
   const token=localStorage.getItem('token');
   if(token){
      return req.headers.Authorization=`Bearer ${token}`
   }
   return req;
});

export default API;