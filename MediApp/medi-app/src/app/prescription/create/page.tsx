"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PrescriptionCreate(params: any) {
  const router = useRouter();

  const [date, setDate] = useState<string>("");
  const [medicine, setMedicine] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const appointmentId = params.params.id;

  const token = sessionStorage.getItem("token");
  console.log("Token de autenticação: ", token); // Log do token

  const addPrescription = async (e: any) => {
    e.preventDefault();
    setError(null);

    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!date || !medicine || !dosage) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formData = {
      date: date,
      appointmentId: appointmentId,
      medicine: medicine,
      dosage: dosage,
      instructions: instructions,
    };

    try {
      // Envia os dados para o servidor
      const add = await fetch("http://127.0.0.1:3001/postPrescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      if (!add.ok) {
        const content = await add.json();
        console.error("Erro no servidor:", content); // Exibe a resposta do erro do servidor
        setError(content.error || "Erro desconhecido no servidor.");
        return;
      }

      const content = await add.json();

      if (content.date) {
        // Se a prescrição foi criada com sucesso, redirecione para a página home
        router.push("/home");
      } else {
        setError(content.error || "Erro desconhecido.");
      }
    } catch (err) {
      console.error("Erro ao enviar a prescrição:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <form className="form-container" onSubmit={addPrescription}>
        <h1 className="form-header">PRESCRIPTION CREATION FORM</h1>
        <div>
          <label>Prescription date</label>
          <input
            type="date"
            name="date"
            className="form-input"
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Medicine</label>
          <textarea
            name="medicine"
            className="form-input"
            value={medicine}
            onChange={(e: any) => setMedicine(e.target.value)}
          />
        </div>
        <div>
          <label>Dosage</label>
          <textarea
            name="dosage"
            className="form-input"
            value={dosage}
            onChange={(e: any) => setDosage(e.target.value)}
          />
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            name="instructions"
            className="form-input"
            value={instructions}
            onChange={(e: any) => setInstructions(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
        <div>
          {error && (
            <div
              className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400"
              style={{ color: "red" }}
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
