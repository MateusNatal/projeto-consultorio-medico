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
      <h1></h1>
      <h1 className="form-header">FAKE API DATA</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {!!fakeApiData &&
            fakeApiData.map((data: any) => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h1></h1>
      <button
        className="fakeapi-button__list"
        onClick={(e) => requestFakeApi()}
      >
        SEARCH DATA
      </button>
    </>
  );
}
