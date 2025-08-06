// src/pages/Register.tsx
import { useState } from "react";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Card from "../layout/Card";
import { fakeAuthApi } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fakeAuthApi.register(username, email, password);
      toast.success("Registration successful! Please log in.");
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-[var(--color-bg)] px-4">
      <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
          Join Stratex Todo Manager
        </h1>
        <p className="text-gray-600 text-lg">
          Sign up to take control of your productivity!
          <br /> Create tasks, add categories, and organize everything in one
          place.
          <br /> Get started now and manage your todos like a pro.
        </p>
      </div>
      <div className="md:w-1/3">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
            Create Account
          </h2>
          <form onSubmit={handleRegister}>
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button type="submit">Register</Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[var(--color-primary)] hover:underline"
            >
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
