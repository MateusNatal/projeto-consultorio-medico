"use client";
import React from "react";
import Link from "next/link";

export default function PacientEdit() {
  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1> Edit Pacient Page </h1>
    </>
  );
}
