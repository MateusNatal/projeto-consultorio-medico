"use client";
import React from "react";
import Link from "next/link";

export default function DoctorEdit() {
  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1> Edit Doctor Page </h1>
    </>
  );
}
