'use client'
// import node module libraries
import React from "react";
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
import { Fragment } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { ModalFooter } from "react-bootstrap";
import { yellow } from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import Card from 'react-bootstrap/Card';

const Usuarios = () => {
    const [show, setShow] = useState(false);
    const [dia, setDay] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (

        <DashboardLayout>

            <Container fluid className="App">
                <br></br>
                <Card >
                    <Card.Body>
                <h3>Usuarios </h3>


                <Row >
                    <Col xs={5} md={3}>
                        <Form className="d-flex align-items-center">
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
                                    <th> <h5 style={{fontWeight: "900" }}>Usuario</h5></th>
                                    <th> <h5 style={{fontWeight: "900" }}>Nombre</h5></th>
                                    <th><h5 style={{fontWeight: "900" }}>Apellido</h5></th>
                                    <th><h5 style={{fontWeight: "900" }}>Correo</h5></th>
                                    <th><h5 style={{fontWeight: "900" }}>Roles</h5></th>
                                    <th><h5 style={{fontWeight: "900" }}>Creado en</h5> </th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td  >1</td>
                                    <td style={{color: "#2196f3" }}> Mark </td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td> <Badge bg="success">Success</Badge></td>
                                    <td>Otto</td>
                                    <td> <Button  style={{ backgroundColor: "#03386a" }} onClick={handleShow}>Agregar Rol</Button></td>
                                    <td> <LockIcon/></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td style={{color: "#2196f3" }}>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td> <Badge bg="success">Success</Badge></td>
                                    <td>Otto</td>
                                    <td> <Button  style={{ backgroundColor: "#03386a" }} >Agregar Rol</Button></td>
                                    <td> <LockIcon/></td>
                                </tr>
                            </tbody>
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
						<Modal.Title > <h5 style={{fontWeight: "700" }}  > ASIGNAR ROL</h5>
						</Modal.Title>
					</Col>

				</Modal.Header>
				<Modal.Body>
					<Form>
						<Container>

							<Row>
								<Col sm={6}>
									<Form.Group as={Row} className="mb-3" controlId="formGridEmail">
										<Form.Label style={{fontWeight: "900" }} column sm={5}>Nombre</Form.Label>
                                        <Col sm="8">
											<Form.Control  type="text" disabled = {true}  />
                                            </Col>
									</Form.Group>
								</Col>

								<Col >
									<Form.Group as={Row} className="mb-3" controlId="formGridEmail">
										<Form.Label style={{fontWeight: "900" }} column sm={5}>Apellido</Form.Label>
                                        <Col sm="8">
											<Form.Control type="text" disabled = {true} />
                                            </Col>
									</Form.Group>
								</Col>
							</Row>


							

							<Row>
								<Col sm={6}>
                                <Form>
                                <Form.Label style={{fontWeight: "900" }} column sm={4}>Roles</Form.Label>
      {['checkbox'].map((type) => (
        <div key={type} className="mb-3">
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

					</Form>


					

				</Modal.Body>
<ModalFooter>

<Button size="lg" style={{ backgroundColor: "#f6a700" ,borderColor: "#f6a700", borderRadius: "30px"}} >Guardar</Button>
</ModalFooter>

			</Modal>




        </DashboardLayout>






    );
};





export default Usuarios;
