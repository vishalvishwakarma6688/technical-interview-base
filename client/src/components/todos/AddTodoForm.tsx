import { useState } from "react";
import { Category, Tag } from "@/api/categories";

interface AddTodoFormProps {
  categories: Category[];
  tags: Tag[];
  onAdd: (todo: {
    title: string;
    description: string;
    categoryId?: string | null;
    tags: string[];
  }) => Promise<void>;
}

export default function AddTodoForm({ categories, tags, onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({
      title,
      description,
      categoryId: categoryId || null,
      tags: selectedTags,
    });
    setTitle("");
    setDescription("");
    setCategoryId("");
    setSelectedTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg mb-10 border space-y-3">
      <h2 className="text-xl font-semibold">Add New Todo</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center space-x-1">
              <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={(e) =>
                  setSelectedTags(
                    e.target.checked
                      ? [...selectedTags, tag.id]
                      : selectedTags.filter((t) => t !== tag.id)
                  )
                }
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:opacity-90"
      >
        Add Todo
      </button>
    </form>
  );
}
