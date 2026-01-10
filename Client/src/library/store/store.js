import { create } from "zustand";



const useAuthStore=create({
   user:null,
   token:localStorage.getItem('token', token);

   login:(user,token)=>{
      localStorage.setItem('token',token);
      set({user,token});
   },

   logout:()=>{
      localStorage.removeItem('token');
      set({user:null,token:null});
   },
});

export default useAuthStore;