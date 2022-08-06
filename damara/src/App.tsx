
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import {Container, Navbar, NavDropdown} from "react-bootstrap";
import Stage from "./components/Stage";


/**
 * https://react-bootstrap.github.io/layout/grid/
 * @constructor
 */
function App() {
  return (
    <div className="App">
      <Container className={"bg-light"}>
        <Row >
            <Navbar bg="dark" className={"navbar navbar-dark bg-dark navbar-expand-lg navbar-light bg-light text-muted me-1"} expand="lg">
                <Container fluid={"fluid"} >
                    <Navbar.Brand className="navbar-pad" href="#home"><strong><em>Damara</em></strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navbar-pad">
                            <Nav.Link href="http://mvargas2.com/" target={"_blank"}>mvargas2</Nav.Link>
                            <Nav.Link href="https://github.com/agentVargas2012R" target={"_blank"}>Github</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Row>
        <Stage />
      </Container>
    </div>
  );
}

export default App;
