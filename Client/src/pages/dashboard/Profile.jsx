import { useEffect, useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Camera, User, Mail, ShieldCheck, UploadCloud, Loader2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/user/profile");
        setUser(data?.user || null);
      } catch (err) {
        const msg =
          typeof err === "string"
            ? err
            : err?.response?.data?.message || "Failed to load profile";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ preview cleanup to avoid memory leak
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // basic validation (optional)
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }

    // clean old preview
    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!image) return toast.error("Please select an image first!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);

      const { data } = await api.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile image updated successfully!");
      setUser(data?.user || user);

      // reset
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setImage(null);
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Image upload failed";
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-14 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
        <p className="text-gray-500 mt-2">Please login again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">
          Manage your profile information and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Upload */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100">
              <img
                src={
                  preview ||
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                }
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <label className="absolute bottom-2 right-2 bg-green-600 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-green-700 transition-colors border-2 border-white">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 mt-1 uppercase tracking-wider">
              {user.role || "Member"}
            </span>
          </div>

          {image && (
            <button
              onClick={handleImageUpload}
              disabled={uploading}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition disabled:opacity-50"
            >
              <UploadCloud size={18} />
              {uploading ? "Uploading..." : "Save Changes"}
            </button>
          )}
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User size={20} className="text-green-600" /> Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Full Name
                </label>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-xl border border-transparent">
                  <User size={18} className="text-gray-400" />
                  <p className="text-gray-800 font-medium">{user.name}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Email Address
                </label>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-xl border border-transparent">
                  <Mail size={18} className="text-gray-400" />
                  <p className="text-gray-800 font-medium">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-600" /> Account Security
            </h4>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <div>
                <p className="text-sm font-bold text-green-900">Account Status</p>
                <p className="text-xs text-green-700">
                  Your account is protected with login authentication.
                </p>
              </div>
              <ShieldCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
