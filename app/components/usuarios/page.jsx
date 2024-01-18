'use client'
// import node module libraries
import React from "react";
import { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DashboardLayout from "@/app/(home)/layout";
import Badge from 'react-bootstrap/Badge';
import { ModalFooter } from "react-bootstrap";
import LockIcon from '@mui/icons-material/Lock';
import Card from 'react-bootstrap/Card';
import dateFormat from 'dateformat';




const Usuarios = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [gets, setGets] = useState([]);
    const [user, setUser] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA1NjMxMDMyfQ.k4evZFxzRZanPeOL77agmQbzyQAToK2myQm1JWn8M7o"


    async function getUser() {
        try {
            const response = await fetch('http://10.2.1.174:35789/admin/users', {
                method: "GET",
                headers: new Headers({

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })

            });
            const result = await response.json();
            console.log(result)
            setGets(result)
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
       getUser();
    }, [])


    const mostrar = (id) => {

        fetch(`http://10.2.1.174:35789/admin/users/${id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setUser(data)
            console.log("aqui")
            console.log(data)
        })

    }

    return (

        <DashboardLayout>

            <Container fluid >
                <br></br>
                <Card >
                    <Card.Body>
                        <h3>Usuarios </h3>


                        <Row >
                            <Col xs={5} md={3}>
                                <Form >
                                    <Form.Control type="search" placeholder="Search" />

                                </Form>
                            </Col></Row>
                        <br></br>
                        <Row>
                            <Col >


                                <Table responsive >
                                    <thead>
                                        <tr >
                                            <th> <h5 >ID</h5></th>
                                            <th> <h5 style={{ fontWeight: "900" }}>Usuario</h5></th>
                                            <th> <h5 style={{ fontWeight: "900" }}>Nombre</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Apellido</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Correo</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Roles</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Creado en</h5> </th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {gets.length != null && (
                                        <tbody>
                                            {gets?.map(get => (
                                                <tr key={get.id}>
                                                    <td  >{get.id}</td>
                                                    <td style={{ color: "#2196f3" }}>{get.username} </td>
                                                    <td>{get.name}</td>
                                                    <td>{get.id}</td>
                                                    <td>{get.email}</td>
                                                    <td> <Badge bg="success">Success</Badge></td>
                                                    <td>{dateFormat(get.created_at, "mmmm d, yyyy ")}</td>
                                                    <td> <Button style={{ backgroundColor: "#03386a" }} onClick={() =>{handleShow(); mostrar(get.id)}}>Agregar Rol</Button></td>
                                                    <td> <LockIcon /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </Table>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <br></br>
                    <Col sm={5} >
                        <Modal.Title > <h5 style={{ fontWeight: "700" }} > ASIGNAR ROL</h5>
                        </Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    {user.length != null && (
                        <Container>
                        {user?.map((us, index) => (
                            <Row key={index}>
                                <Col sm={6}>
                                    <Form.Group as={Row} controlId="formGridEmail">
                                        <Form.Label style={{ fontWeight: "900" }} column sm={5}>Nombre</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" disabled={true} />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col >
                                    <Form.Group as={Row} controlId="formGridEmail">
                                        <Form.Label style={{ fontWeight: "900" }} column sm={5}>Apellido</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" disabled={true} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                           
                            </Row>

))}


                            <Row>
                                <Col sm={6}>
                                    <Form>
                                        <Form.Label style={{ fontWeight: "900" }} column sm={4}>Roles</Form.Label>
                                        {['checkbox'].map((type) => (
                                            <div key={type} >
                                                <Form.Check type={type} id={`check-api-${type}`}>
                                                    <Form.Check.Input type={type} isValid />
                                                    <Form.Check.Label>{`Admin `}</Form.Check.Label>

                                                </Form.Check>

                                                <Form.Check type={type} id={`check-api-${type}`}>
                                                    <Form.Check.Input type={type} isValid />
                                                    <Form.Check.Label>{`Rol-2 `}</Form.Check.Label>

                                                </Form.Check>
                                            </div>
                                        ))}
                                    </Form>

                                </Col>
                            </Row>

                        </Container>
  )}
                    </Form>




                </Modal.Body>
                <ModalFooter>

                    <Button size="lg" style={{ backgroundColor: "#f6a700", borderColor: "#f6a700", borderRadius: "30px" }} >Guardar</Button>
                </ModalFooter>

            </Modal>




        </DashboardLayout>






    );
};





export default Usuarios;
