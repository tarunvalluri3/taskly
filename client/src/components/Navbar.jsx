import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  LogIn,
  LogOut
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Active", path: "/ongoing", icon: ListChecks },
  { name: "Completed", path: "/completed", icon: CheckCircle2 },
  { name: "Missed", path: "/failed", icon: AlertTriangle },
  { name: "Deleted", path: "/deleted", icon: Trash2 }
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    setMenu(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* TOP NAV */}
      <nav className="sticky top-0 z-50 bg-black text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-sm sm:text-base font-semibold tracking-wide"
          >
            TrackMyWork
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md transition ${
                      isActive(item.path)
                        ? "bg-white text-black"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden lg:flex">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-white/20 hover:bg-white hover:text-black transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-white/20 hover:bg-white hover:text-black transition"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenu(v => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-40 bg-black text-white transform transition-transform duration-300 lg:hidden ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center gap-6 px-6">

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenu(false)}
                className={`w-full max-w-xs flex items-center justify-center gap-3 text-base font-medium py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-white text-black"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}

          {/* Auth CTA */}
          <div className="pt-6 w-full max-w-xs">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-white/20 hover:bg-white hover:text-black transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenu(false)}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-white/20 hover:bg-white hover:text-black transition"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
