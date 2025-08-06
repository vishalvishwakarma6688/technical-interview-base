import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
// import {
//   createTodo,
//   getTodos,
//   updateTodo,
//   deleteTodo,
//   TodoPayload,
// } from "@/api/todos";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/api/todos.mock";
import { getCategories, getTags, Category, Tag } from "@/api/categories";
import FilterSection from "../todos/FilterSection";
import AddTodoForm from "../todos/AddTodoForm";
import EditTodoModal from "../todos/EditTodoModal";
import { TodoPayload } from "@/api/todos";
import ConfirmModal from "../common/ConfirmModal";

interface Todo {
  id: string;
  title: string;
  description?: string;
  status?: "Pending" | "Completed";
  categoryId?: string | null;
  tags?: string[];
}

interface Filters {
  search: string;
  categoryId: string;
  status: string;
  tags: string[];
}

export default function Dashboard() {
  const { user, logout } = useAuth();

  // State
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categoryId: "",
    status: "",
    tags: [],
  });

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    logout();
    toast.success("Logged out!");
    setShowLogoutModal(false);
  };

  const handleEdit = (todo: any) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (id: string, data: Partial<TodoPayload>) => {
    try {
      await updateTodo(id, data);
      toast.success("Todo updated!");
      fetchTodos();
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteClick = (id: string) => {
    setTodoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (todoToDelete) {
      await deleteTodo(todoToDelete);
      toast.success("Todo deleted!");
      fetchTodos();
    }
    setShowDeleteModal(false);
  };

  const handleToggleStatus = async (todo: any) => {
    try {
      await updateTodo(todo.id, {
        status: todo.status === "Completed" ? "Pending" : "Completed",
      });
      toast.success("Todo status updated!");
      fetchTodos();
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Fetch Todos
  const fetchTodos = async (filterParams?: Filters) => {
    try {
      const data = await getTodos(filterParams);
      setTodos(data);
    } catch {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load (categories, tags, todos)
  useEffect(() => {
    (async () => {
      try {
        const [cats, tgs] = await Promise.all([getCategories(), getTags()]);
        setCategories(cats);
        setTags(tgs);
      } catch {
        toast.error("Failed to load categories/tags");
      }
    })();
    fetchTodos();
  }, []);

  // Fetch todos when filters change
  useEffect(() => {
    fetchTodos(filters);
  }, [filters]);

  const handleCreateTodo = async (todoData: {
    title: string;
    description: string;
    categoryId?: string | null;
    tags: string[];
  }): Promise<void> => {
    if (!todoData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    try {
      await createTodo(todoData);
      toast.success("Todo added!");
      fetchTodos();
    } catch (err) {
      toast.error("Failed to add todo");
    }
  };

  // Stats
  const completedCount = todos.filter((t) => t.status === "Completed").length;
  const pendingCount = todos.length - completedCount;

  if (loading) return <p className="text-center mt-96">Loading dashboard...</p>;

  return (
    <div className="p-8 max-w-4xl h-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          Welcome, {user?.name || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending</h2>
          <p className="text-2xl font-bold text-red-500">{pendingCount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Completed</h2>
          <p className="text-2xl font-bold text-green-500">{completedCount}</p>
        </div>
      </div>

      {/* Add Todo Form */}
      <AddTodoForm
        categories={categories}
        tags={tags}
        onAdd={handleCreateTodo}
      />

      {/* Filters */}
      <FilterSection
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        tags={tags}
      />

      {/* Todo List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
        {todos.length === 0 ? (
          <p className="text-gray-600">No todos found.</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="p-4 bg-white shadow rounded-lg border"
              >
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                {todo.description && (
                  <p className="text-gray-600">{todo.description}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={
                      todo.status === "Completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {todo.status || "Pending"}
                  </span>
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(todo)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    {todo.status === "Completed"
                      ? "Mark Pending"
                      : "Mark Completed"}
                  </button>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(todo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <EditTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
        todo={editingTodo}
        categories={categories}
        tags={tags}
      />

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Todo"
        message="Are you sure you want to delete this todo?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
