import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTodos,
  markComplete,
  markIncomplete,
  deleteTodo,
  updateTodo,
} from "../services/api";
import { useToast } from "../context/ToastContext";
import {
  CheckCircle2,
  CircleAlert,
  Trash2,
  Pencil,
  PlusSquare,
} from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import { ListTodo } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Ongoing = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editTodo, setEditTodo] = useState(null);
  const [failId, setFailId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [reason, setReason] = useState("");

  const { show } = useToast();

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos("current");
      setTodos(res.data);
    } catch {
      show("Failed to load active tasks", "error");
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

  const handleComplete = async (id) => {
    try {
      await markComplete(id);
      show("Task marked completed", "success");
      loadTodos();
    } catch {
      show("Action failed", "error");
    }
  };

  const saveEdit = async () => {
    try {
      await updateTodo(editTodo._id, editTodo);
      show("Task updated", "success");
      setEditTodo(null);
      loadTodos();
    } catch {
      show("Update failed", "error");
    }
  };

  const confirmFail = async () => {
    try {
      await markIncomplete(failId, reason);
      show("Task marked missed", "warning");
      setFailId(null);
      setReason("");
      loadTodos();
    } catch {
      show("Action failed", "error");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteTodo(deleteId, reason);
      show("Task deleted", "warning");
      setDeleteId(null);
      setReason("");
      loadTodos();
    } catch {
      show("Delete failed", "error");
    }
  };

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
    <div className="space-y-5 pb-24">
      <header>
        <h1 className="text-xl sm:text-2xl font-bold">Active Tasks</h1>
        <p className="text-sm text-gray-600 mt-1">
          Tasks you are currently working on
        </p>
      </header>

      {todos.length === 0 && (
        <EmptyState
          icon={ListTodo}
          title="No active tasks"
          subtitle="Create a task to start tracking your work"
          ctaLabel="Create Task"
          ctaTo="/create-todo"
        />
      )}

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="p-4 space-y-2 bg-white border rounded-xl shadow-sm"
          >
            <h2 className="text-base font-semibold">{todo.title}</h2>
            {todo.description && (
              <p className="text-sm text-gray-600">{todo.description}</p>
            )}

            <div className="text-xs text-gray-500 space-y-1">
              <p>Due: {new Date(todo.dueAt).toLocaleString()}</p>
              <p className="capitalize">Priority: {todo.priority}</p>
            </div>

            <div className="flex gap-2 pt-2 flex-wrap">
              <button
                onClick={() => handleComplete(todo._id)}
                className="px-3 py-1.5 text-xs text-white bg-green-600 rounded-md flex items-center gap-1"
              >
                <CheckCircle2 size={14} /> Complete
              </button>

              <button
                onClick={() => {
                  setFailId(todo._id);
                  setReason("");
                }}
                className="px-3 py-1.5 text-xs text-white bg-yellow-600 rounded-md flex items-center gap-1"
              >
                <CircleAlert size={14} /> Missed
              </button>

              <button
                onClick={() => {
                  setDeleteId(todo._id);
                  setReason("");
                }}
                className="px-3 py-1.5 text-xs text-white bg-red-600 rounded-md flex items-center gap-1"
              >
                <Trash2 size={14} /> Delete
              </button>

              <button
                onClick={() => setEditTodo(todo)}
                className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-md flex items-center gap-1"
              >
                <Pencil size={14} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Bottom CTA */}
      <div className=" p-4 bg-white  shadow-lg">
        <Link
          to="/create-todo"
          className=" py-3 text-sm font-medium text-white bg-black rounded-xl flex items-center justify-center gap-2"
        >
          <PlusSquare size={18} />
          Add New Task
        </Link>
      </div>

      {editTodo && (
        <EditModal
          todo={editTodo}
          setTodo={setEditTodo}
          onSave={saveEdit}
          onClose={() => setEditTodo(null)}
        />
      )}

      {failId && (
        <ReasonModal
          title="Why did you miss this task?"
          onCancel={() => setFailId(null)}
          onConfirm={confirmFail}
          reason={reason}
          setReason={setReason}
        />
      )}

      {deleteId && (
        <ReasonModal
          title="Why are you deleting this task?"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
          reason={reason}
          setReason={setReason}
        />
      )}
    </div>
  );
};

const EditModal = ({ todo, setTodo, onSave, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-sm p-5 space-y-3 bg-white rounded-xl">
      <h3 className="text-base font-semibold">Edit Task</h3>

      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="w-full px-3 py-2 text-sm border rounded-lg"
      />

      <textarea
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        className="w-full px-3 py-2 text-sm border rounded-lg"
      />

      <input
        type="datetime-local"
        value={todo.dueAt.slice(0, 16)}
        onChange={(e) => setTodo({ ...todo, dueAt: e.target.value })}
        className="w-full px-3 py-2 text-sm border rounded-lg"
      />

      <select
        value={todo.priority}
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
        className="w-full px-3 py-2 text-sm border rounded-lg"
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-2 text-sm border rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-3 py-2 text-sm text-white bg-black rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

const ReasonModal = ({ title, onCancel, onConfirm, reason, setReason }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-sm p-5 space-y-4 bg-white rounded-xl">
      <h3 className="text-base font-semibold">{title}</h3>
      <textarea
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-lg"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-2 text-sm border rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-2 text-sm text-white bg-black rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default Ongoing;
