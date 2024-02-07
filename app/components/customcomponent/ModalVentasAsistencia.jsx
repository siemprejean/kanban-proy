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


const ModalVentasAsistencia = ((data) => {
    console.log(data.fecha)
    console.log(data.monto)
    return (
        <>
            <Modal.Header closeButton>
                <Col sm={4} >
                    <Modal.Title>Detalle de ventas diarias
                    </Modal.Title>
                </Col>
                <Col sm={4} >
                    <Modal.Title style={{textAlign:'center'}}>{data.fecha}
                    </Modal.Title>
                </Col>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col className="modal-ventas-col-4">
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Total de ventas diarias</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="5/5" value={data.monto}/>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col className="modal-ventas-col-4">
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Total de vendedores</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="5/5" />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col className="modal-ventas-col-4">
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>% de ventas diarias</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="8.72%" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col className="modal-ventas-col-4">
                                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Total Incentivos diarios</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="text" placeholder="$69.90" />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col className="modal-ventas-col-8">
                            <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                    <Form.Label column sm={4}>Observaciones</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="textarea" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form>


                <Container fluid className="App table-modal-container">
                    <h5>Detalles por vendedor</h5>
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