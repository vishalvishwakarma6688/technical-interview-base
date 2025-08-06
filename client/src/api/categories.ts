import axios from "axios";

const CATEGORY_API = "http://localhost:3000/api/category";
const TAG_API = "http://localhost:3000/api/tag";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export const getCategories = async () => {
  const res = await axios.get(CATEGORY_API);
  return res.data;
};

export const getTags = async () => {
  const res = await axios.get(TAG_API);
  return res.data;
};
