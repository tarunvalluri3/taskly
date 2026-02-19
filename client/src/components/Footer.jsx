import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  LayoutDashboard,
  ListTodo,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  LogIn,
  LogOut
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Active", path: "/ongoing", icon: ListTodo },
  { name: "Completed", path: "/completed", icon: CheckCircle2 },
  { name: "Missed", path: "/failed", icon: AlertTriangle },
  { name: "Deleted", path: "/deleted", icon: Trash2 }
];

const Footer = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <footer className="mt-16 bg-black text-gray-300">

      {/* MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Brand Block */}
        <div className="space-y-3 text-center sm:text-left">
          <h2 className="text-white text-lg font-semibold tracking-tight">
            TrackMyWork
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-md">
            Professional task tracking with lifecycle analytics,
            performance insights, and accountability workflows.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Navigation
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                  <Icon size={14} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Auth Action */}
        <div className="pt-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition"
            >
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <LogIn size={14} />
              Login
            </Link>
          )}
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} TrackMyWork</span>
          <span>Built by Tarun Valluri</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
