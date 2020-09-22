import React from "react";
import { Navbar } from "react-bootstrap";
export default function NavBar() {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand style={{ color: "white" }} href="#home">
        React-Shopping Cart
      </Navbar.Brand>
    </Navbar>
  );
}
