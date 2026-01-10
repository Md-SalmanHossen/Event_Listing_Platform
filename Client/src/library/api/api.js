import axios from "axios";

const API=axios.create({
   BASE_URL:import.meta.env.BASE_URL,
});

API.interceptors.request.use((config)=>{
   const token=localStorage.getItem('token');
   if(token){
      return config.headers.Authorization=`Bearer ${token}`;
   }
   return config;
});

export default API;