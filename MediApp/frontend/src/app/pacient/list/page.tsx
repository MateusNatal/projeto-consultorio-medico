"use client";
import React, { useEffect, useState } from "react"; // HOOK = gancho
import Link from "next/link";

export default function PacientList() {
  const [pacients, setPacients] = useState(new Array());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/pacients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setPacients(data));
  }, [pacients]);

  const deletePacient = async (id: any) => {
    const add = await fetch(`http://127.0.0.1:3001/pacients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    });
    const content = await add.json();

    if (content.login) {
      window.location.reload();
    } else {
      setError(content.error);
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
            <td>Name</td>
            <td>Birth date</td>
            <td>Email</td>
            <td>Phone</td>
            <th className="action-column"></th>
            <th className="action-column"></th>
          </tr>
        </thead>

        <tbody className="pacients" id="pacients">
          {!!pacients &&
            pacients.map((pacient: any) => (
              <tr>
                <td>{pacient.name}</td>
                <td>{pacient.birthDate}</td>
                <td>{pacient.email}</td>
                <td>{pacient.phone}</td>

                <td>
                  <button
                    onClick={(e) => deletePacient(pacient._id)}
                    className="delete-button__list"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    href={`/pacient/edit/${pacient._id}`}
                    className="edit-button__list"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
    </>
  );
}
