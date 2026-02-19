import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../services/api";
import { useToast } from "../context/ToastContext";

const CreateTodo = () => {
  const navigate = useNavigate();
  const { show } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const t = title.trim();
    const d = description.trim();

    if (!t || !dueAt) {
      show("Title and due time are required", "warning");
      return;
    }

    try {
      setLoading(true);

      await createTodo({
        title: t,
        description: d,
        dueAt,
        priority
      });

      show("Task created successfully", "success");
      navigate("/ongoing");

    } catch {
      show("Failed to create task", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-black">
          Create New Todo
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Add task details, deadline and priority.
        </p>
      </header>

      <form onSubmit={submit} className="p-5 space-y-5 bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Complete Task By</label>
          <input
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="w-full py-3 text-sm font-medium tracking-wide text-white bg-black rounded-lg hover:opacity-90 transition disabled:opacity-70"
        >
          {loading ? "Creating..." : "Create Todo"}
        </button>

      </form>
    </div>
  );
};

export default CreateTodo;
