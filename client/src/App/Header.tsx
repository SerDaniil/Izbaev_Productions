import React from "react";
import { Outlet } from "react-router";
// import { Link } from "react-router-dom";
import "./style.css";

export default function Header(): JSX.Element {
  return (
    <>
      <header className="header">
        <p>NAI|IZBAEV</p>
      </header>

      <Outlet />
    </>
  );
}
