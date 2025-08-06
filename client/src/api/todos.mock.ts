import { TodoPayload } from "./todos";

interface Todo extends TodoPayload {
  id: string;
}

let idCounter = 1;
let todos: Todo[] = [
  {
    id: (idCounter++).toString(),
    title: "Learn React",
    description: "Practice hooks & context",
    status: "Pending",
    categoryId: "1",
    tags: ["frontend"],
  },
  {
    id: (idCounter++).toString(),
    title: "Read about DDD",
    description: "Study domain-driven design",
    status: "Completed",
    categoryId: "2",
    tags: ["architecture"],
  },
  {
    id: (idCounter++).toString(),
    title: "Write unit tests",
    description: "Cover Auth module",
    status: "Pending",
    categoryId: "3",
    tags: ["testing", "backend"],
  },
  {
    id: (idCounter++).toString(),
    title: "Setup Docker",
    description: "Containerize backend API",
    status: "Completed",
    categoryId: "2",
    tags: ["devops"],
  },
  {
    id: (idCounter++).toString(),
    title: "Design homepage",
    description: "Make UI in Figma",
    status: "Pending",
    categoryId: "1",
    tags: ["design", "frontend"],
  },
  {
    id: (idCounter++).toString(),
    title: "Implement WebSockets",
    description: "Real-time updates for todos",
    status: "Pending",
    categoryId: "3",
    tags: ["backend", "realtime"],
  },
  {
    id: (idCounter++).toString(),
    title: "Refactor services",
    description: "Improve code readability",
    status: "Completed",
    categoryId: "2",
    tags: ["backend"],
  },
  {
    id: (idCounter++).toString(),
    title: "Write README",
    description: "Add setup instructions",
    status: "Completed",
    categoryId: "3",
    tags: ["documentation"],
  },
  {
    id: (idCounter++).toString(),
    title: "Optimize performance",
    description: "Lazy load components",
    status: "Pending",
    categoryId: "1",
    tags: ["frontend", "optimization"],
  },
  {
    id: (idCounter++).toString(),
    title: "Create login page",
    description: "Add authentication UI",
    status: "Completed",
    categoryId: "1",
    tags: ["frontend", "auth"],
  },
];

interface Filters {
  search?: string;
  categoryId?: string;
  status?: string;
  tags?: string[];
}

export const getTodos = async (filters?: Filters) => {
  let filtered = [...todos];

  if (filters?.search) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        t.description?.toLowerCase().includes(filters.search!.toLowerCase())
    );
  }

  if (filters?.categoryId) {
    filtered = filtered.filter((t) => t.categoryId === filters.categoryId);
  }

  if (filters?.status) {
    filtered = filtered.filter((t) => t.status === filters.status);
  }

  if (filters?.tags?.length) {
    filtered = filtered.filter((t) =>
      filters.tags!.every((tag) => t.tags?.includes(tag))
    );
  }

  return Promise.resolve(filtered);
};

export const getTodoById = async (id: string) => {
  return Promise.resolve(todos.find((t) => t.id === id));
};

export const createTodo = async (data: TodoPayload) => {
  const newTodo: Todo = {
    id: (idCounter++).toString(),
    ...data,
    status: data.status || "Pending",
  };
  todos.push(newTodo);
  return Promise.resolve(newTodo);
};

export const updateTodo = async (id: string, data: Partial<TodoPayload>) => {
  todos = todos.map((t) => (t.id === id ? { ...t, ...data } : t));
  return Promise.resolve(todos.find((t) => t.id === id));
};

export const deleteTodo = async (id: string) => {
  todos = todos.filter((t) => t.id !== id);
  return Promise.resolve({ message: "Deleted" });
};
