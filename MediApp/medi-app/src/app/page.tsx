"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState<string>(""); //hook
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const authentication = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (login != "" && password != "") {
      const formData = {
        login: login,
        password: password,
      };

      const add = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const content = await add.json();
      if (content.token) {
        sessionStorage.setItem("token", content.token);
        router.push("/home");
      } else {
        setError(content.error);
      }
    }
  };
  return (
    <div>
      <form className="form-container" onSubmit={authentication}>
        <h1 className="form-header">LOGIN</h1>
        <div>
          <label htmlFor="">Usuário</label>
          <input
            type="text"
            name="name"
            className="form-input"
            onChange={(e: any) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Senha
          </label>
          <input
            name="login"
            type="password"
            className="form-input"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="submit-button">Entrar</button>
        </div>
        <div>{error && <div className="error-message">{error}</div>}</div>
      </form>
    </div>
  );
}
