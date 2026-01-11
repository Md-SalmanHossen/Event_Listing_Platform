import React, { useEffect, useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setUser(data.user);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!image) return toast.error("Please select an image first!");
    
    const formData = new FormData();
    formData.append("image", image); // Backend-er upload.single('image') er sathe mil rekhe

    try {
      const { data } = await api.put("/user/profile", formData);
      toast.success("Profile image updated successfully!");
      
      // Backend theke updated user data niye state update korchi
      setUser(data.user); 
      setPreview(null);
      setImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (!user) return <div className="text-center p-10 font-semibold">Loading Profile...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-black text-gray-800 mb-8 text-center uppercase tracking-tight">My Profile</h2>
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg mb-4">
            <img
              src={preview || user.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          {preview && (
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
              NEW PREVIEW
            </div>
          )}
        </div>
        
        <div className="w-full space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Full Name</label>
            <p className="text-lg font-bold text-gray-800">{user.name}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Email Address</label>
            <p className="text-md font-medium text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-3">Change Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
        />
        
        <button
          onClick={handleImageUpload}
          disabled={!image}
          className={`w-full mt-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
            image 
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-indigo-200 active:scale-95" 
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {image ? "Confirm & Save Photo" : "Select Photo to Upload"}
        </button>
      </div>
    </div>
  );
};

export default Profile;