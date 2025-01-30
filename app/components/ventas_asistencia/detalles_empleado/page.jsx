'use client'
// import node module libraries
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import DatePicker from 'react-datepicker';
import 'styles/theme/components/_calendar.scss';
import ModalVentasAsistencia from "../../customcomponent/ModalVentasAsistencia";
import { getEmployee, getEmployees, getStores } from "@/app/data/api";
import MuiSelect from "../../customcomponent/Select";
import MuiTextField from "../../customcomponent/formcontrol";
import TokenValidation from "../../customcomponent/tokenvalidation";
import { useRouter } from "next/navigation";
import ReactDatePicker from "react-datepicker";


const events = [
    {
        title: "$2,500",
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

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}



export default function DetallesEmpleados() {
    const [show, setShow] = useState(false);
    //const [startDate, setStartDate] = useState(new Date());
    const [detail, setDetail] = useState([]);
    const [empleado, setEmpleados] = useState([0]);
    const [tienda, setTiendas] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [employees, setEmployees] = useState([]);
    const [employeestore, setEmployeestore] = useState([0]);
    const [stores, setStores] = useState([]);
    const colourOptions = stores.map((item) => ({ value: item.id, label: item.name }));
    const router = useRouter();
    const token = localStorage.getItem('token');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;


    useEffect(() => {
        // Decodificar el token JWT para obtener su contenido
      //  const tokenData = JSON.parse(atob(token.split('.')[1]));

        // Obtener la fecha de expiración del token del campo "exp"
    //    const expirationTime = tokenData.exp;

        // Convertir la fecha de expiración a milisegundos
     //   const expirationTimeMillis = expirationTime * 1000;

        // Obtener la fecha actual en milisegundos
     //   const currentTimeMillis = new Date().getTime();

        // Verificar si el token ha expirado
      /*  if (currentTimeMillis > expirationTimeMillis) {
            console.log('El token ha expirado');
            router.push('/components/login');
        } else {
            fetchData();
            console.log('El token está activo');
        }*/

    }, []);

    const fetchData = async () => {
        try {
            const employee = await getEmployees();
            const store = await getStores();
            const storeemployee = store.map((items) => ({
                ...items,
                employeesd: employee.filter((employe) => employe.id_store === items.id)
            }));
            console.log("Esto tiene storeemployee", employee)

            setEmployees(employee);
            setStores(store);
            console.log("Esto tiene employeestore", employeestore)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchDetail = async (id) => {
        try {
            console.log("Esto tiene id", id)
            const employee = await getEmployee(id);
            const store = await getStores();
            const employeesstore = {
                ...employee,
                store: store.filter((store) => store.id === employee.id_store)
            };
            console.log("Esto tiene employeesstore", employeesstore)
            setDetail(employee);
            //setStores(store);
            //console.log("Esto tiene employeestore", employeestore)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleChangeEmployee = async (event) => {
        const selectedEmployee = parseInt(event);
        setEmpleados(selectedEmployee);
        fetchDetail(selectedEmployee);
        console.log("esto tiene selectedEmployee", selectedEmployee)
    };
    const handleChangeStores = async (event) => {
        const selectedStore = parseInt(event);
        setTiendas(selectedStore);
        const employeeStore = employees.filter((employe) => employe.id_store === selectedStore);
        setEmployeestore(employeeStore);
        console.log("esto tiene selectedStore", selectedStore)
    };


    return (
        <DashboardLayout>
            <Fragment>
                <Container fluid className="calendar-container">
                    <Card>
                        <Card.Body>
                            <h4 className="calendar-title">Detalle de Empleado</h4>
                            <Row className="calendar-filters">
                                <Col xs={3} className="calendar-filter">
                                    <MuiSelect title="Tiendas:" items={stores} value={tienda} onChange={handleChangeStores} className="modal-col-12" />
                                </Col>
                                <Col xs={3} className="calendar-filter">
                                    <MuiSelect title="Empleados:" items={employeestore} value={empleado} onChange={handleChangeEmployee} className="modal-col-12" />
                                </Col>
                                <Col xs={3} className="calendar-filter">
                                    <ReactDatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(update) => {
                                            setDateRange(update);
                                        }}
                                        isClearable={true}
                                    />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col xs={5} className="calendar-filter">
                                    <Row>
                                        <MuiTextField title="Nombre Completo:" value={detail.name + ' ' + detail.last_name} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Cargo:" value={' '} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Tienda:" value={detail.store} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Localidad:" value={' '} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Empresa:" value={' '} className="calendar-col-6" />
                                    </Row>
                                </Col>
                                <Col xs={5} className="calendar-filter">
                                    <Row>
                                        <MuiTextField title="Nº Empleados:" value={detail.identification} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Nº Tarjeta:" value={detail.card_number} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Fecha de Inicio:" value={' '} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Turnos:" value={' '} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Días Libres:" value={' '} className="calendar-col-6" />
                                    </Row>
                                </Col>
                                <Col xs={3} className="calendar-filter">
                                    <Row>
                                        <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "75%", color: "HighlightText", flex: "auto" }} onClick={() => { fetchCountries(), openModalCreate() }}>
                                            CREAR
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button style={{ borderRadius: "10px", backgroundColor: "#03386a", width: "75%", color: "HighlightText", flex: "auto" }} onClick={() => { fetchCountries(), openModalCreate() }}>
                                            CREAR
                                        </Button>
                                    </Row>
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
                <ModalVentasAsistencia />
            </Modal>
        </DashboardLayout>
    );
}