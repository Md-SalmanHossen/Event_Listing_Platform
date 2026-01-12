import React, { useEffect, useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Camera, User, Mail, ShieldCheck, UploadCloud } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await api.put("/user/profile", formData);
      toast.success("Profile image updated successfully!");
      setUser(data.user); 
      setPreview(null);
      setImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your profile information and account security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar Upload */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100">
              <img
                src={preview || user.image || "https://ui-avatars.com/api/?name=" + user.name}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <label className="absolute bottom-2 right-2 bg-indigo-600 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors border-2 border-white">
              <Camera size={20} />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1 uppercase tracking-wider">
              {user.role || 'Member'}
            </span>
          </div>

          {image && (
            <button
              onClick={handleImageUpload}
              disabled={uploading}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              <UploadCloud size={18} />
              {uploading ? "Uploading..." : "Save Changes"}
            </button>
          )}
        </div>

        {/* Right Column: User Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User size={20} className="text-indigo-600" /> Personal Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-xl border border-transparent focus-within:border-indigo-100 transition-all">
                  <User size={18} className="text-gray-400" />
                  <p className="text-gray-800 font-medium">{user.name}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-xl border border-transparent">
                  <Mail size={18} className="text-gray-400" />
                  <p className="text-gray-800 font-medium">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" /> Account Security
            </h4>
            <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <p className="text-sm font-bold text-indigo-900">Email Verified</p>
                <p className="text-xs text-indigo-700">Your account is fully secured with this email.</p>
              </div>
              <ShieldCheck className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;