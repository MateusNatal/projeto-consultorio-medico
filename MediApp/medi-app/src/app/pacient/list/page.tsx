"use client";
import React from "react";
import Link from "next/link";

export default function PacientList() {
  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1> List Pacient Page </h1>
    </>
  );
}
