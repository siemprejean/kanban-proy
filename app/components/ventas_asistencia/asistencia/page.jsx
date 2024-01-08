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


const events = [
	{ start: new Date() }

]


const Asistencia = () => {
	const [show, setShow] = useState(false);
	const [dia, setDay] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	return (

		<DashboardLayout>

			<Fragment>
				<Container fluid className="p-12">

					<Row >
						<Col xs={6} md={4}>
							<Form className="d-flex align-items-center">
								<Form.Control type="search" placeholder="Search" />

							</Form>
						</Col>

						<Col xs={6} md={4}>
							<Form className="d-flex align-items-center">
								<Form.Control type="search" placeholder="Search" />
							</Form>
						</Col>

						<Col xs={6} md={4}>
							<Form className="d-flex align-items-center">
								<Form.Control type="search" placeholder="Search" />

							</Form>
						</Col>
					</Row>
					<br></br>
					<Row >
						<Col md={12} >
							<FullCalendar
								id="calendar"
								views={["month", "week", "day"]}
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView='dayGridMonth'
								dateClick={(e) => handleShow(e)}
								weekends={true}
								events={events}

								eventContent={renderEventContent}
							/>


						</Col>
					</Row>
				</Container>

			</Fragment>

			<Modal size="lg" show={show} onHide={handleClose}>
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
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>ID</th>
											<th>Usuario</th>
											<th>Nombre</th>
											<th>Apellido</th>
											<th>Correo</th>
											<th>Roles</th>


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


			</Modal>
		</DashboardLayout>
	);
};

function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	)
}



export default Asistencia;
