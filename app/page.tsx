"use client";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await invoke("verify_pass", { pass: password });

    if (result) {
      sessionStorage.setItem("pass", password);
      window.location.href = "/dashboard";
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <form
        className="w-full rounded-xl shadow-xl px-12 flex flex-col gap-4 py-6 bg-slate-50 max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold w-full text-center">
          Iniciar sesión
        </h1>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border-2 border-slate-300 p-2 text-sm"
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 px-4 text-white"
        >
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}
