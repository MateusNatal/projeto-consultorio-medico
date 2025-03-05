"use client";
import React, { useEffect, useState } from "react"; // HOOK = gancho
import Link from "next/link";

export default function DoctorList() {
  const [doctors, setDoctors] = useState<any[]>([]); // Tipando como array de qualquer coisa
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError(
        "Você precisa estar autenticado para visualizar a lista de médicos."
      );
      return;
    }

    fetch("http://127.0.0.1:3001/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha na autenticação. Erro 401.");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctors(data); // Agora sabemos que data é um array
        } else {
          setError("Erro: resposta da API não é um array.");
        }
      })
      .catch((error) => {
        setError(error.message); // Trata o erro de forma adequada
      });
  }, []); // A dependência foi corrigida para o array vazio, rodando uma vez na montagem

  const deleteDoctor = async (id: any) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("Você precisa estar autenticado para excluir um médico.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:3001/doctors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      const content = await response.json();

      if (content.login) {
        window.location.reload();
      } else {
        setError(content.error || "Erro desconhecido ao excluir o médico.");
      }
    } catch (err) {
      setError("Erro na requisição para excluir o médico.");
    }
  };

  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <table className="table">
        <thead>
          <tr className="thead tr">
            <td className="td">Name</td>
            <td className="td">Login</td>
            <td className="td">Medical Specialty</td>
            <td className="td">Medical Record</td>
            <td className="td">Email</td>
            <td className="td">Phone number</td>
          </tr>
        </thead>

        <tbody className="doctors" id="doctors">
          {!!doctors &&
            doctors.map((doctor: any) => (
              <tr key={doctor._id}>
                <td className="td">{doctor.name}</td>
                <td className="td">{doctor.login}</td>
                <td className="td">{doctor.medicalSpecialty}</td>
                <td className="td">{doctor.medicalRegistration}</td>
                <td className="td">{doctor.email}</td>
                <td className="td">{doctor.phone}</td>
                <td className="">
                  <button
                    onClick={(e) => deleteDoctor(doctor._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <Link href={`/doctor/edit/${doctor._id}`}>
                    <button className="edit-button__list">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {error && (
          <div className="error-message" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </div>
    </>
  );
}
