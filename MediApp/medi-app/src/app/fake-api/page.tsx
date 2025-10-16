"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function FakeApi() {
  const [fakeApiData, setFakeApiData] = useState(null);

  const requestFakeApi = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setFakeApiData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Link href="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1 className="form-header">FAKE API DATA</h1>
      <button className="home-button__put" onClick={(e) => requestFakeApi()}>
        SEARCH DATA
      </button>
      <table>
        <thead>
          <tr>
            <th className="td">NAME</th>
            <th className="td">USERNAME</th>
            <th className="td">EMAIL</th>
            <th className="td">PHONE NUMBER</th>
          </tr>
        </thead>
        <tbody>
          {!!fakeApiData &&
            fakeApiData.map((data: any) => (
              <tr key={data.id}>
                <td className="td">{data.name}</td>
                <td className="td">{data.username}</td>
                <td className="td">{data.email}</td>
                <td className="td">{data.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
