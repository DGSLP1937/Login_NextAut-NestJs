"use client";


import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';

import Desplegable from '@/components/desplegable.png'

const BarraNavegacion = () => {
  const { data: session } = useSession();

  return (
    <>
    {/* 
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link
          href="/"
          className="btn btn-primary btn-sm"
        >
          Home
        </Link>
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="btn btn-primary btn-sm"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="btn btn-danger btn-sm"
            >
              Signout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-primary btn-sm"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
    */}
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Next-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {session?.user ? (
              <>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>

              <Nav.Link href="/dashboard">
                <button
                  onClick={() => signOut()}
                  className="btn btn-danger btn-sm"
                >
                  Salir
                </button>
              </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
            {/*
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
             */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};
export default BarraNavegacion;
