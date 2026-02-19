import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, parseApiError } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

const emailValid = v => /^\S+@\S+\.\S+$/.test(v);

const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});

  const validate = (eVal, pVal) => {
    const e = {};
    if (!eVal) e.email = "Email required";
    else if (!emailValid(eVal)) e.email = "Invalid email format";
    if (!pVal) e.password = "Password required";
    else if (pVal.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (loading) return; // double-submit guard
    setFormError("");

    const eVal = email.trim().toLowerCase();
    const pVal = password.trim();

    if (!validate(eVal, pVal)) return;

    try {
      setLoading(true);
      await login({ email: eVal, password: pVal });
      await refreshUser();
      navigate("/ongoing");
    } catch (err) {
      setFormError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const field = name =>
    `w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
      errors[name] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-gray-600">Access your tasks and progress</p>
      </header>

      <form onSubmit={submit} className="p-5 space-y-5 bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input value={email} onChange={e=>setEmail(e.target.value)} onBlur={()=>validate(email.trim(), password.trim())} className={field("email")}/>
          </div>
          {errors.email && <p className="text-xs text-red-600 flex gap-1"><AlertCircle size={12}/>{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input type={showPwd?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} onBlur={()=>validate(email.trim(), password.trim())} className={field("password")}/>
            <button type="button" onClick={()=>setShowPwd(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-600 flex gap-1"><AlertCircle size={12}/>{errors.password}</p>}
        </div>

        {formError && <div className="flex gap-2 text-sm text-red-600"><AlertCircle size={16}/>{formError}</div>}

        <button disabled={loading} className="w-full py-3 text-sm font-medium text-white bg-black rounded-lg flex items-center justify-center gap-2 disabled:opacity-70">
          {loading && <Loader2 size={16} className="animate-spin"/>}
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account? <Link to="/signup" className="underline">Signup</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
