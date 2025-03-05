"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="form-container">
        <h1 className="form-header"> HOME </h1>
        <br></br>
        <div className="topic-box">
          <h1 className="form-text">Doctors</h1>
          <Link href="/doctor/create">
            <button className="home-button__put">Create new doctor</button>
          </Link>
          <Link href="/doctor/list">
            <button className="home-button__get">List all doctors</button>
          </Link>
        </div>
        <div className="topic-box">
          <h1 className="form-text">Pacients</h1>
          <Link href="/pacient/create">
            <button className="home-button__put">Create new pacient</button>
          </Link>
          <Link href="/pacient/list">
            <button className="home-button__get">List all pacients</button>
          </Link>
        </div>
        <div className="topic-box">
          <h1 className="form-text">Appointments</h1>
          <Link href="/appointment/create">
            <button className="home-button__put">Create new appointment</button>
          </Link>
          <Link href="/appointment/list">
            <button className="home-button__get">List all appointments</button>
          </Link>
        </div>
        <div className="topic-box">
          <h1 className="form-text">Prescriptions</h1>
          <Link href="/prescription/create">
            <button className="home-button__put">
              Create new prescription
            </button>
          </Link>
          <Link href="/prescription/upload">
            <button className="home-button__get">Upload prescriptions</button>
          </Link>
        </div>
        <br></br>
        <div className="topic-box">
          <h1 className="form-text">Fake API</h1>
          <Link href="/fake-api">
            <button className="home-button__put">Acess FakeAPI</button>
          </Link>
        </div>
      </div>
    </>
  );
}
