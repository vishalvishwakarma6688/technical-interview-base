import { useState } from "react";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Card from "../layout/Card";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in!");
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-[var(--color-bg)] px-4">
      <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
          Stratex Todo Manager
        </h1>
        <p className="text-gray-600 text-lg">
          Organize your tasks effortlessly!
          <br /> Create, categorize, and tag todos with ease.
          <br /> Stay on top of your priorities with powerful filtering and
          real-time updates.
        </p>
      </div>
      <div className="md:w-1/3">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
