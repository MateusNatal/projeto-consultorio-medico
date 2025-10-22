"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PrescriptionCreate() {
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:3001/prescriptions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data);
      });
  }, []);

  const [file, setFile] = useState<Blob>();
  const [error, setError] = useState<string | unknown>("");

  const [prescriptions, setPrescriptions] = useState(new Array());

  const uploadPrescription = async (id: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:3001/uploadPrescription/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: file,
        }
      );

      router.push("/prescription/upload");
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      setError(error);
    }
  };

  const showFile = async (id: any) => {
    try {
      const res = await fetch("http://127.0.0.1:3001/readPrescription/" + id, {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = id + ".pdf";
      link.click();

      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      setError(error);
    }
  };

  const generatePrescription = async (id: any) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:3001/generatePrescription/" + id,
        {
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      // handle the error
      if (!res.ok) throw new Error(await res.text());

      const content = await res.json();

      if (content._id) {
        window.location.reload();
      } else {
        setError(content.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <table>
        <thead>
          <tr>
            <td className="">Date</td>
            <td className="">Medicine</td>
            <td className="">Dosage</td>
            <td className="">Instructions</td>
            <th className="action-column"></th>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>

        <tbody className="doctors" id="doctors">
          {!!prescriptions &&
            prescriptions.map((prescription: any, index) => (
              <tr key={prescription._id || prescription.id || index}>
                <td>{prescription.date}</td>
                <td>{prescription.medicine}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.instructions}</td>

                {!prescription.file && (
                  <td>
                    <label className="file-input">
                      {file ? file.name : "Choose file"}
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                      />
                    </label>
                  </td>
                )}
                {!prescription.file && (
                  <td>
                    <button
                      onClick={(e) => uploadPrescription(prescription._id)}
                      className="upload-button"
                    >
                      Upload
                    </button>
                  </td>
                )}
                {!prescription.file && (
                  <td>
                    <button
                      onClick={(e) => generatePrescription(prescription._id)}
                      className="generate-button"
                    >
                      Generate Prescription
                    </button>
                  </td>
                )}
                {prescription.file && (
                  <td>
                    <button
                      onClick={(e) => showFile(prescription._id)}
                      className=".submit-button__list"
                    >
                      Show file
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
