import React from 'react';
import {Accordion, Nav} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import { FaChartLine, FaDatabase, FaWarehouse, FaReact, FaBootstrap, FaGoogle, FaAws, FaVectorSquare, FaFileSignature } from 'react-icons/fa';

import "./Stage.css";

export default class Stage extends React.Component {
    render() {
        return (
            <Row className={'main-wrapper'} fluid>
                <Col xs={12} sm={3} className={"bg-dark"}>

                    <div className={"sideNav-width"}>
                        <Nav className={"navbar-dark navbar-light flex-column me-0 me-sm-2  sideNav-lg"}
                             activeKey="/inventory"
                             as="ul">
                            <Accordion defaultActiveKey="0" >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header className={"dark-background menu"}>Warehouse</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <div className={"anchor hover-link"}>
                                                <Link to="/inventory"><FaChartLine/> Analytics</Link>
                                            </div>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <div className={"anchor hover-link"}>
                                                <Link  to="/upload"><FaWarehouse /> Management</Link>
                                            </div>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header className={"dark-background"}>Sample Sets</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="#"><FaDatabase/> Warehouse Data</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="#"><FaDatabase/> Inventory Data</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="#"><FaDatabase/> Product Data</Nav.Link>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header className={"dark-background"}>Tech Stack</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://reactjs.org/" target={"_blank"}><FaReact/> React-Typescript</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://react-bootstrap.github.io/" target={"_blank"}><FaBootstrap/> React-Bootstrap</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://www.npmjs.com/package/material-react-js" target={"_blank"}> <FaGoogle/> React-Material</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://aws.amazon.com/" target={"_blank"}><FaAws/> Web Services</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://graphql.org/" target={"_blank"}><FaVectorSquare /> GraphQL</Nav.Link>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header className={"dark-background"}>Partners</Accordion.Header>
                                    <Accordion.Body className={"bg-dark"}>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://www.bidscale.com/" target={"_blank"}> <FaFileSignature /> BidScale</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link  href="https://www.jeffersonfrank.com/about" target={"_blank"}><FaFileSignature /> Jefferson Frank</Nav.Link>
                                        </Nav.Item>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Nav>
                    </div>
                </Col>
                <Col xs={12} sm={9} ><Outlet /></Col>
            </Row>
        );
    }
}