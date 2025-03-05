import { Outlet } from "react-router-dom";

const UserManagementLayout = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Outlet />
    </div>
  );
};

export default UserManagementLayout;