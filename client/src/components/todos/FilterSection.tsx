import { Category, Tag } from "@/api/categories";

interface FilterSectionProps {
  filters: {
    search: string;
    categoryId: string;
    status: string;
    tags: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    categoryId: string;
    status: string;
    tags: string[];
  }>>;
  categories: Category[];
  tags: Tag[];
}

export default function FilterSection({ filters, setFilters, categories, tags }: FilterSectionProps) {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4 border space-y-3">
      <h2 className="text-lg font-semibold">Filter Todos</h2>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        className="w-full p-2 border rounded"
        value={filters.categoryId}
        onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        className="w-full p-2 border rounded"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center space-x-1">
              <input
                type="checkbox"
                value={tag.id}
                checked={filters.tags.includes(tag.id)}
                onChange={(e) => {
                  const newTags = e.target.checked
                    ? [...filters.tags, tag.id]
                    : filters.tags.filter((t) => t !== tag.id);
                  setFilters({ ...filters, tags: newTags });
                }}
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
