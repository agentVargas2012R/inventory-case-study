import React from 'react';
import styled from "styled-components";
import {Accordion, Nav} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import { FaChartLine, FaCloud, FaDatabase, FaWarehouse, FaReact, FaBootstrap, FaGoogle, FaAws, FaVectorSquare, FaFileSignature } from 'react-icons/fa';
//import { "fa-solid fa-chart-column"}
const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 20%;     /* Set the width of the sidebar */
  z-index: 1;      /* Stay on top of everything */      
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
  font-size: 20px;    
`;

export default class Stage extends React.Component {
    render() {
        return (
            <Row className={'main-wrapper'} fluid>
                <Col xs={3} className={"bg-dark"}>
                    <StyledSideNav>
                        <Nav className={"navbar-dark bg-dark navbar-light bg-light flex-column me-2 sideNav-lg"}
                             activeKey="/inventory"
                             as="ul">
                            <Accordion defaultActiveKey="0" >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header className={"dark-background menu"}>Warehouse</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <div className={"anchor"}>
                                                <Link className={"text-muted text-decoration-none"} to="/inventory"><FaChartLine/> Analytics</Link>
                                            </div>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <div className={"anchor"}>
                                                <Link className={"text-muted text-decoration-none"} to="/upload"><FaWarehouse /> Management</Link>
                                            </div>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header className={"dark-background"}>Sample Sets</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="#"><FaDatabase/> Warehouse Data</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="#"><FaDatabase/> Inventory Data</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="#"><FaDatabase/> Product Data</Nav.Link>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header className={"dark-background"}>Tech Stack</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://reactjs.org/" target={"_blank"}><FaReact/> React-Typescript</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://react-bootstrap.github.io/" target={"_blank"}><FaBootstrap/> React-Bootstrap</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://www.npmjs.com/package/material-react-js" target={"_blank"}> <FaGoogle/> React-Material</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://aws.amazon.com/" target={"_blank"}><FaAws/> Web Services</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://graphql.org/" target={"_blank"}><FaVectorSquare /> GraphQL</Nav.Link>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header className={"dark-background"}>Partners</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://www.bidscale.com/" target={"_blank"}> <FaFileSignature /> BidScale</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link className={"text-muted"} href="https://www.jeffersonfrank.com/about" target={"_blank"}><FaFileSignature /> Jefferson Frank</Nav.Link>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Nav>
                    </StyledSideNav>



                </Col>
                <Col xs={9}><Outlet /></Col>
            </Row>
        );
    }
}