"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PacientCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addPacient = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (name != "" && birthDate != "" && email != "" && phone != "") {
      const formData = {
        name: name,
        birthDate: birthDate,
        email: email,
        phone: phone,
      };

      const add = await fetch("http://127.0.0.1:3001/postPacient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await add.json();

      if (content.name) {
        router.push("/home");
      } else {
        setError(content.error);
      }
    }
  };

  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>

      <form className="form-container" onSubmit={addPacient}>
        <h1 className="form-header">FORM CREATE NEW PACIENT</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>Birth date</label>
          <input
            type="date"
            name="birthDate"
            className="form-input"
            onChange={(e: any) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>Phone</label>
          <input
            type="phone"
            name="phone"
            className="form-input"
            onChange={(e: any) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <button className="submit-button">Submit</button>
        </div>
        <div>{error && <div className="error-message">{error}</div>}</div>
      </form>
    </>
  );
}
