import { Button } from "@/components/ui/button";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <User size={24} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <Button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-black hover:bg-gray-100 bg-transparent"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;