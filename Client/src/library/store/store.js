import { create } from "zustand";
import API from './../api/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')||null),
  token: localStorage.getItem("token"),

 login:async(email,password)=>{
  try {
    const {data}=await API.post('/user/login',{email,password});

    if(data.token){
      localStorage.setItem('token',data.token);
      localStorage.setItem('user',JSON.stringify(data.user));

      set({token:data.token, user:token.data})
    }

    return data;
  } catch (error) {
    throw error;
  }
 },

  register:async(name,email,password)=>{
    try {
      const {data}=await API.post('/user/login',{name,email,password});
      return data;
    } catch (error) {
      console.log('Register failed',error.response?.data||error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
