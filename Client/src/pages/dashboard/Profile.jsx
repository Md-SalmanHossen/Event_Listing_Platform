import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import useAuthStore from "../../library/store/useAuthStore";
import { Camera, User, Mail, ShieldCheck, UploadCloud, Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const [user, setUser] = useState(null);

  // edit name
  const [name, setName] = useState("");

  // image upload
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [becoming, setBecoming] = useState(false);

  //  1) Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/user/profile");

        const u = data?.user || null;
        setUser(u);
        setName(u?.name || "");
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

  // cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  //  2) Pick image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  //  3) Save profile (name + image same endpoint)
  const handleSaveProfile = async () => {
    if (!name.trim() && !image) {
      return toast.error("Nothing to update");
    }

    const formData = new FormData();
    if (name.trim()) formData.append("name", name.trim());
    if (image) formData.append("image", image);

    try {
      setSaving(true);

      const { data } = await api.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data?.message || "Profile updated!");
      setUser(data?.user || user);

      //  localStorage user update
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // reset image selection
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setImage(null);
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Update failed";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  //  4) Become organizer → logout → login page
  const handleBecomeOrganizer = async () => {
    try {
      setBecoming(true);

      const { data } = await api.put("/user/become-organizer");

      toast.success(data?.message || "You are now an organizer! Please login again.");

      //  IMPORTANT: logout, so new role works everywhere
      logout();

      //  go login
      navigate("/login", { replace: true });
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Failed to become organizer";
      toast.error(msg);
    } finally {
      setBecoming(false);
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Profile</h1>
        <p className="text-gray-500">Update your name, photo and role.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Avatar */}
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
              {user.role || "member"}
            </span>
          </div>

          {user.role !== "organizer" && (
            <button
              onClick={handleBecomeOrganizer}
              disabled={becoming}
              className="mt-6 w-full px-4 py-2.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition disabled:opacity-50"
            >
              {becoming ? "Please wait..." : "Become Organizer"}
            </button>
          )}
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User size={20} className="text-green-600" /> Personal Information
            </h4>

            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Email Address
              </label>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-xl">
                <Mail size={18} className="text-gray-400" />
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50"
            >
              <UploadCloud size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
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
