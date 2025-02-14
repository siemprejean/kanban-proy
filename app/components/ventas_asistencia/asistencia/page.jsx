'use client'
// import node module libraries
import React from "react";
import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DashboardLayout from "../../home/layout";
import { Fragment } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import Card from 'react-bootstrap/Card';
import Select from 'react-select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getStores} from "@/app/data/api";
import 'styles/theme/components/_calendar.scss';


const events = [
	{
		title: "5/5",
		start: getDate("YEAR-MONTH-06"),
		backgroundColor: "#64EA8F",

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
	const [startDate, setStartDate] = useState(new Date());
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [storesOption, setStoresOption] = useState([]);
	const [yearValue, setYearValue] = useState('');
    const [monthValue, setMonthValue] = useState('');
    const [calendarValue, setCalendarValue] = useState('');


	useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
           
            const stores = await getStores();
   
            console.log(stores);

            storeOptions(stores);
            console.log(storesOption);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

	const storeOptions = (data) => {
        data.map((data) => {
            const option = {
                value: data.id,
                label: data.name
            }
            setStoresOption(storesOption => [...storesOption, option])
        })
    }

	const calendarFilters = (newValue, filtro) => {
        console.log("entre")
        // const storeSelected = calendarValue
        calendarValue.map((val)=>{
            console.log(val.value)
        })
        console.log(calendarValue)
        console.log(filtro)
        console.log(yearValue)
        console.log(monthValue)
        if (calendarValue) {
            newValue
        }
    }

	return (

		<DashboardLayout>

			<Fragment>
				<Container fluid className="calendar-container">

					<Card  >
						<Card.Body>
						<h4 className="calendar-title">Asistencia de personal en tienda </h4>

							<Row className="calendar-filters">
								<Col xs={6} className="calendar-filter">
									<Select

										isMulti
										name="tiendas"
										options={storesOption}
										className="basic-multi-select"
										classNamePrefix="select"
										onChange={(newValue) => calendarFilters(setCalendarValue(newValue), 'store')}
									/>
								</Col>

								<Col xs={3} className="calendar-filter">
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												label={'Año'}
												openTo="year"
												views={['year']}
											/>
										</DemoContainer>
									</LocalizationProvider>

								</Col>

								<Col  xs={3} className="calendar-filter">
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DatePicker']}>
											<DatePicker
												label={'Mes'}
												openTo="month"
												views={['month']}
											/>
										</DemoContainer>
									</LocalizationProvider>
								</Col>
							</Row>
							<br></br>
							<Row className="cal-calendar-content">
								<Col md={12} >
									<FullCalendar
										headerToolbar={{
											start: "prev next today",
											center: "title",
											end: "dayGridMonth dayGridWeek dayGridDay",
										}}
										views={["month", "week", "day"]}
										plugins={[dayGridPlugin, interactionPlugin]}
										dateClick={(e) => { handleShow(e) }}
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
