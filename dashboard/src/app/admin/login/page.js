"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1337/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Email or password incorrect");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-sm mx-auto mt-20 bg-white shadow rounded">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 border"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border"/>
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
