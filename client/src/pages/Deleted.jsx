import { useEffect, useRef, useState } from "react";
import { getTodos } from "../services/api";
import { useToast } from "../context/ToastContext";
import { Trash2 } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {ArrowRight} from "lucide-react" 

const Deleted = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);
  const { show } = useToast();

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos("deleted");
      setTodos(res.data);

      // strict mode guard
      if (!didRun.current) {
        show("Deleted tasks loaded", "info");
        didRun.current = true;
      }
    } catch {
      show("Failed to load deleted tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }

    loadTodos();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Deleted Tasks
        </h1>
        <p className="mt-1 text-sm text-gray-600">Tasks you removed</p>
        <Link
          to="/create-todo"
          className=" mt-3 w-full max-w-xs px-6 py-3 text-sm font-semibold text-white bg-black rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          Create Task <ArrowRight size={16} />
        </Link>
      </header>

      {todos.length === 0 && (
        <EmptyState
          icon={Trash2}
          title="No deleted tasks"
          subtitle="Deleted tasks will appear here"
        />
      )}

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="p-4 space-y-2 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Trash2 size={16} className="text-red-600" />
              <h2 className="text-base font-semibold text-black">
                {todo.title}
              </h2>
            </div>

            {todo.description && (
              <p className="text-sm text-gray-600">{todo.description}</p>
            )}

            <div className="space-y-1 text-xs text-gray-500">
              <p>Due: {new Date(todo.dueAt).toLocaleString()}</p>
              <p className="capitalize">Priority: {todo.priority}</p>
              <p className="font-medium text-red-700">Status: Deleted</p>
            </div>

            {todo.deleteReason && (
              <p className="text-xs text-gray-600">
                Reason: {todo.deleteReason}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deleted;
