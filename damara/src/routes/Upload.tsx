import React from 'react';
import Axios from 'axios';
import {UPLOAD_ENDPOINT} from "../models/Model";
import { Container } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import UploadCard from "../components/UploadCard";

export default class Upload extends React.Component {
    render() {
        return (
            <Container fluid="true">
                <div>
                    <Row fluid>
                        <UploadCard />
                    </Row>
                </div>
            </Container>
        );
    }
}