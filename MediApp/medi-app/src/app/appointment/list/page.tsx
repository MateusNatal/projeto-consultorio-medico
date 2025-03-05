import React from "react";
import Link from "next/link";

export default function AppointmentList() {
  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1> Appointment List Page </h1>
    </>
  );
}
