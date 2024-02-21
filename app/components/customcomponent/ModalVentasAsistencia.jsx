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
                                        <th style={{ fontWeight: "900" }}>Codigo Vendedor</th>
                                        <th style={{ fontWeight: "900" }}>Vendedor</th>
                                        <th style={{ fontWeight: "900" }}>Ventas Hoy</th>
                                        <th style={{ fontWeight: "900" }}>Ventas Mensuales</th>
                                        <th style={{ fontWeight: "900" }}>Porcentaje vs total de tiendas</th>
                                        <th style={{ fontWeight: "900" }}>Incentivo Inicial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PA-85443</td>
                                        <td>Juan Gomez</td>
                                        <td>$50</td>
                                        <td>$700</td>
                                        <td>30%</td>
                                        <td>$19.10</td>
                                    </tr>
                                    <tr>
                                        <td>PA-855431</td>
                                        <td>Pedro López</td>
                                        <td>$65</td>
                                        <td>$812</td> 
                                        <td>38%</td>
                                        <td>$16.12</td>
                                    </tr>
                                    <tr>
                                        <td>PA-001820</td>
                                        <td>Doralis Mela</td>
                                        <td>$27</td>
                                        <td>$510</td>
                                        <td>15%</td>
                                        <td>$21.70</td>
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