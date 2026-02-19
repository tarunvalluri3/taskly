import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup, parseApiError } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

const emailValid = v => /^\S+@\S+\.\S+$/.test(v);
const strongPwd = v => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v);

const Signup = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPwd,setShowPwd]=useState(false);
  const [loading,setLoading]=useState(false);
  const [formError,setFormError]=useState("");
  const [errors,setErrors]=useState({});

  const validate=(n,e,p)=>{
    const er={};
    if(!n || n.length<2) er.name="Name too short";
    if(!emailValid(e)) er.email="Invalid email";
    if(!strongPwd(p)) er.password="Min 8 chars + number";
    setErrors(er);
    return Object.keys(er).length===0;
  };

  const submit=async ev=>{
    ev.preventDefault();
    if(loading) return;
    setFormError("");

    const n=name.trim();
    const e=email.trim().toLowerCase();
    const p=password.trim();

    if(!validate(n,e,p)) return;

    try{
      setLoading(true);
      await signup({name:n,email:e,password:p});
      await refreshUser();
      navigate("/ongoing");
    }catch(err){
      setFormError(parseApiError(err));
    }finally{
      setLoading(false);
    }
  };

  const field=name=>`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${errors[name]?"border-red-500":"border-gray-300"}`;

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-gray-600">Start tracking your tasks</p>
      </header>

      <form onSubmit={submit} className="p-5 space-y-5 bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input value={name} onChange={e=>setName(e.target.value)} onBlur={()=>validate(name.trim(), email.trim(), password.trim())} className={field("name")}/>
          </div>
          {errors.name && <p className="text-xs text-red-600 flex gap-1"><AlertCircle size={12}/>{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input value={email} onChange={e=>setEmail(e.target.value)} onBlur={()=>validate(name.trim(), email.trim(), password.trim())} className={field("email")}/>
          </div>
          {errors.email && <p className="text-xs text-red-600 flex gap-1"><AlertCircle size={12}/>{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input type={showPwd?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} onBlur={()=>validate(name.trim(), email.trim(), password.trim())} className={field("password")}/>
            <button type="button" onClick={()=>setShowPwd(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-600 flex gap-1"><AlertCircle size={12}/>{errors.password}</p>}
        </div>

        {formError && <div className="flex gap-2 text-sm text-red-600"><AlertCircle size={16}/>{formError}</div>}

        <button disabled={loading} className="w-full py-3 text-sm font-medium text-white bg-black rounded-lg flex items-center justify-center gap-2 disabled:opacity-70">
          {loading && <Loader2 size={16} className="animate-spin"/>}
          {loading?"Creating...":"Create Account"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;
