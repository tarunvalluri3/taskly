import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

/* ---------- LAZY PAGES ---------- */

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Ongoing = lazy(() => import("./pages/Ongoing"));
const Completed = lazy(() => import("./pages/Completed"));
const Failed = lazy(() => import("./pages/Failed"));
const Deleted = lazy(() => import("./pages/Deleted"));
const CreateTodo = lazy(() => import("./pages/CreateTodo"));

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        <Suspense fallback={null}>
          <Routes>
            {/* public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ongoing"
              element={
                <ProtectedRoute>
                  <Ongoing />
                </ProtectedRoute>
              }
            />

            <Route
              path="/completed"
              element={
                <ProtectedRoute>
                  <Completed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/failed"
              element={
                <ProtectedRoute>
                  <Failed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/deleted"
              element={
                <ProtectedRoute>
                  <Deleted />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-todo"
              element={
                <ProtectedRoute>
                  <CreateTodo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
