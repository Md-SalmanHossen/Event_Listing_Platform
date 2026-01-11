import useAuthStore from '../../library/store/store';
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { user, token } = useAuthStore();

  // Not logged in → redirect to login
  if (!token) return <Navigate to='/login' />;

  // User data still loading
  if (!user) return <div className="p-10 text-center font-bold">Loading user data...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className='bg-green-500 text-white p-4 flex justify-between items-center'>
        <h1 className="font-bold text-lg">Dashboard - {user.role || 'User'}</h1>
        <div className="flex items-center gap-4">
          <img
            src={user.image && user.image !== "" ? user.image : "https://via.placeholder.com/40"}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{user.name || 'Guest'}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
