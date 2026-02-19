import { useEffect, useRef, useState } from "react";
import { getTodos } from "../services/api";
import { useToast } from "../context/ToastContext";
import { CheckCircle2 } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";

const Completed = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);
  const { show } = useToast();

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos("completed");
      setTodos(res.data);

      // toast only once guard
      if (!didRun.current) {
        show("Completed tasks loaded", "info");
        didRun.current = true;
      }
    } catch {
      show("Failed to load completed tasks", "error");
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
          Completed Tasks
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Tasks you finished successfully
        </p>
      </header>

      {/* {todos.length === 0 && (
        <div className="p-6 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">No completed tasks yet.</p>
        </div>
      )} */}

      {todos.length === 0 && (
        <EmptyState
          icon={CheckCircle2}
          title="No completed tasks yet"
          subtitle="Tasks you finish will appear here"
        />
      )}

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="p-4 space-y-2 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-600" />
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
              <p className="text-green-700 font-medium">Status: Completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Completed;
