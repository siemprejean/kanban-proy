'use client'
// import node module libraries
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'styles/theme/components/_modal.scss';

//import { propTypes } from 'react-bootstrap/esm/Image';


const ModalVentasAsistencia = (() => {
    return (
        <>
            <Modal.Header closeButton>
                <Col sm={4} >
                    <Modal.Title>Detalle de asistencia diaria
                    </Modal.Title>
                </Col>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={5}>Total de asistencia</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="5/5" />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col >
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Compensatorios</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="5/5" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={5}>Ausencias</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="0" />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Licencias</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="0" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={5}>Ausencia justificada</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="0" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Observaciones</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="textarea" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={5}>Tardanzas</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="1" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form>


                <Container fluid className="App">
                    <Row>
                        <Col>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th style={{ fontWeight: "900" }}>ID</th>
                                        <th style={{ fontWeight: "900" }}>Usuario</th>
                                        <th style={{ fontWeight: "900" }}>Nombre</th>
                                        <th style={{ fontWeight: "900" }}>Apellido</th>
                                        <th style={{ fontWeight: "900" }}>Correo</th>
                                        <th style={{ fontWeight: "900" }}>Roles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>1</td>
                                        <td>Mark</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </>
    );
});



export default ModalVentasAsistencia;