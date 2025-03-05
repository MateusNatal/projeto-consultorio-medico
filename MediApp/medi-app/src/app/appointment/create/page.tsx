"use client";
import React from "react";
import Link from "next/link";

export default function AppointmentCreate() {
  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1> Create Appointment Page </h1>
    </>
  );
}
