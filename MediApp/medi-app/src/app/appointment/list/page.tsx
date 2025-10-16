"use client";
import React, { useEffect, useState } from "react"; // HOOK = gancho
import Link from "next/link";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState(new Array());
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState(new Array());
  const [pacients, setPacients] = useState(new Array());

  useEffect(() => {
    fetch("http://127.0.0.1:3001/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      });
  }, [appointments]);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
      });
  }, [doctors]);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/pacients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPacients(data);
      });
  }, [pacients]);

  const deleteAppointment = async (id: any) => {
    const add = await fetch(`http://127.0.0.1:3001/appointments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    });
    const content = await add.json();

    if (content.date) {
      window.location.reload();
    } else {
      setError(content.error);
    }
  };

  const findDoctorName = (id: any) => {
    let name;

    doctors.map((doctor) => {
      if (doctor._id == id) {
        name = doctor.name;
      }
    });

    return name;
  };

  const findPacientName = (id: any) => {
    let name;

    pacients.map((pacient) => {
      if (pacient._id == id) {
        name = pacient.name;
      }
    });

    return name;
  };

  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <table>
        <thead>
          <tr>
            <td className="border border-slate-300">Date</td>
            <td className="border border-slate-300 text-center">Doctor</td>
            <td className="border border-slate-300 text-center">Pacient</td>
          </tr>
        </thead>

        <tbody className="appointments" id="appointments">
          {!!appointments &&
            appointments.map((appointment: any) => (
              <tr key={appointment._id}>
                <td>{appointment.date}</td>
                <td>
                  <label>{findDoctorName(appointment.doctorId)} </label>
                </td>
                <td>
                  <label>{findPacientName(appointment.pacientId)} </label>
                </td>
                <td>
                  <button
                    onClick={(e) => deleteAppointment(appointment._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    href={`/appointment/edit/${appointment._id}`}
                    className="edit-button__list"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    className="submit-button"
                    href={`/prescription/${appointment._id}/create`}
                  >
                    Create new prescription
                  </Link>
                </td>
                <td>
                  <Link className="submit-button" href="/prescription/upload">
                    Upload prescription
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
