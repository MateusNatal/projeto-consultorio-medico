"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DoctorCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addDoctor = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (
      name != "" &&
      login != "" &&
      password != "" &&
      medicalSpecialty != "" &&
      medicalRegistration != "" &&
      email != "" &&
      phone != ""
    ) {
      const formData = {
        name: name,
        login: login,
        password: password,
        medicalSpecialty: medicalSpecialty,
        medicalRegistration: medicalRegistration,
        email: email,
        phone: phone,
      };

      const add = await fetch("http://127.0.0.1:3001/postDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await add.json();

      if (content.login) {
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
      <form className="form-container" onSubmit={addDoctor}>
        <h1 className="form-header">DOCTOR CREATION FORM</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Login</label>
          <input
            name="login"
            className="form-input"
            onChange={(e: any) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            className="form-input"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Medical Specialty</label>
          <input
            name="medicalSpecialty"
            className="form-input"
            onChange={(e: any) => setMedicalSpecialty(e.target.value)}
          />
        </div>
        <div>
          <label>Medical Record</label>
          <input
            name="medicalRegistration"
            className="form-input"
            onChange={(e: any) => setMedicalRegistration(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            className="form-input"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone number</label>
          <input
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
