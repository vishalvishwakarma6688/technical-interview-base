// src/pages/Todos.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Todo {
  id: string;
  title: string;
  description?: string;
  status?: string;
}

export default function Todos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/todo");
      setTodos(res.data);
    } catch (err) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return toast.error("Title is required");
    try {
      await axios.post("http://localhost:3000/api/todo/create", newTodo);
      toast.success("Todo added!");
      setNewTodo({ title: "", description: "" });
      fetchTodos();
    } catch (err) {
      toast.error("Failed to add todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading todos...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-6">
        {user?.name}'s Todos
      </h1>

      {/* Add Todo Form */}
      <form onSubmit={createTodo} className="mb-6 p-4 bg-white shadow rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-3 border rounded"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-3 border rounded"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:opacity-90"
        >
          Add Todo
        </button>
      </form>

      {/* Todo List */}
      {todos.length === 0 ? (
        <p className="text-gray-600">No todos yet. Start by adding one!</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="p-4 bg-white shadow rounded-lg border">
              <h2 className="text-xl font-semibold">{todo.title}</h2>
              {todo.description && <p className="text-gray-600">{todo.description}</p>}
              <p className="mt-2 text-sm text-gray-500">Status: {todo.status || "Pending"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
