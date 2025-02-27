"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="form-container">
        <h1 className="form-header"> Home </h1>
        <Link href="/doctor/create">
          <button className="home-button__put">Create new doctor</button>
        </Link>
        <Link href="/doctor/list">
          <button className="home-button__get">List all doctors</button>
        </Link>
        <br></br>

        <Link href="/pacient/create">
          <button className="home-button__put">Create new pacient</button>
        </Link>
        <Link href="/pacient/lits">
          <button className="home-button__get">List all pacients</button>
        </Link>
        <br></br>

        <Link href="/appointment/create">
          <button className="home-button__put">Create new appointment</button>
        </Link>
        <Link href="/appointment/list">
          <button className="home-button__get">List all appointments</button>
        </Link>
        <br></br>

        <Link href="/prescription/create">
          <button className="home-button__put">Create new prescription</button>
        </Link>
        <Link href="/prescription/list">
          <button className="home-button__get">List all prescriptions</button>
        </Link>
        <br></br>
      </div>
    </>
  );
}
