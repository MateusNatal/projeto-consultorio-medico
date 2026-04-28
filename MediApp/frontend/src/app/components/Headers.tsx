import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="header">
        <h1 className="header-title">
          <Link href="/home">Medi-APP</Link>
        </h1>
      </div>
    </>
  );
}
