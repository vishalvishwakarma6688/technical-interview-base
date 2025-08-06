import { useState, useEffect } from "react";
import { Category, Tag } from "@/api/categories";
import { TodoPayload } from "@/api/todos";
import Button from "../forms/Button";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: Partial<TodoPayload>) => Promise<void>;
  todo: {
    id: string;
    title: string;
    description?: string;
    categoryId?: string;
    tags?: string[];
    status?: "Pending" | "Completed";
  } | null;
  categories: Category[];
  tags: Tag[];
}

export default function EditTodoModal({
  isOpen,
  onClose,
  onSave,
  todo,
  categories,
  tags,
}: EditTodoModalProps) {
  const [form, setForm] = useState<Partial<TodoPayload>>({
    title: "",
    description: "",
    categoryId: "",
    tags: [],
    status: "Pending",
  });

  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title,
        description: todo.description,
        categoryId: todo.categoryId || "",
        tags: todo.tags || [],
        status: todo.status || "Pending",
      });
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleSave = async () => {
    await onSave(todo.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-3 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 mb-3 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full p-2 mb-3 border rounded"
          value={form.categoryId || ""}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={form.tags?.includes(tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({ ...form, tags: [...(form.tags || []), tag.id] });
                    } else {
                      setForm({
                        ...form,
                        tags: form.tags?.filter((t) => t !== tag.id),
                      });
                    }
                  }}
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        <select
          className="w-full p-2 mb-3 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as "Pending" | "Completed" })}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="bg-gray-300 text-black">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[var(--color-primary)] text-white">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
