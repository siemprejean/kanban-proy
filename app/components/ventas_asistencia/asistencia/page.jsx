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
import Card from 'react-bootstrap/Card';

const events = [
	{
		title: "VERDE +10",
		start: getDate("YEAR-MONTH-06"),
		backgroundColor: "green"
	  },
]


function getDate(dayString) {
	const today = new Date();
	const year = today.getFullYear().toString();
	let month = (today.getMonth() + 1).toString();
  
	if (month.length === 1) {
	  month = "0" + month;
	}
  
	return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  

const Asistencia = () => {
	const [show, setShow] = useState(false);
	const [dia, setDay] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	return (

		<DashboardLayout>

			<Fragment>
				<Container fluid className="p-12">

				<Card>
				<Card.Body>
				<h5 style={{fontWeight: "900" }}>Asistencia de personal en tienda </h5>

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
								headerToolbar={{
									start: "prev next today",
									center: "title",
									end: "dayGridMonth dayGridWeek dayGridDay",
								  }}
								views={["month", "week", "day"]}
								plugins={[dayGridPlugin, interactionPlugin]}
								dateClick={(e) => handleShow(e)}
								weekends={true}
								events={events}
								eventContent={renderEventContent}
							/>


						</Col>
					</Row>
					</Card.Body>
					</Card>
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
								<Table >
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
