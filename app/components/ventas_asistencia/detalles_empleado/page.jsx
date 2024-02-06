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
import Select from 'react-select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'styles/theme/components/_calendar.scss';
import ModalVentasAsistencia from "../../customcomponent/ModalVentasAsistencia";

import { getEmployee } from "@/app/data/api";


const events = [
    {
        title: "$2,500",
        start: getDate("YEAR-MONTH-06"),
        backgroundColor: "#64EA8F",
    },
]

const colourOptions = [
    { value: 'VS Albrook', label: 'VS Albrook' },
    { value: 'BBW Albrook', label: 'BBW Albrook' },
    { value: 'VS Multiplaza', label: 'VS Multiplaza' },
    { value: 'BBW Multiplaza', label: 'BBW Multiplaza' }
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





const DetallesEmpleados = () => {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [open, setOpen, page, setPage] = React.useState(0);
    const [checked, setChecked] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [detail, setDetail] = React.useState([]);
    const [storeName, setStoreName] = useState('');
    const [storeComision, setStoreComision] = useState('');
    const [storeRetention, setStoreRetention] = useState('');
    const [storeExcedent, setStoreExcedent] = useState('');
    const [storeIncentive, setStoreIncentive] = useState('');
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openModalCreate = () => setModalCreateOpen(true);
    const closeModalCreate = () => setModalCreateOpen(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stores = await getEmployee();
                setData(stores);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const fetchDetail = async (id) => {
        try {
            const store = await getStore(id);

            setDetail(store);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <DashboardLayout>
            <Fragment>
                <Container fluid className="calendar-container">
                    <Card>
                        <Card.Body>
                            <h4 className="calendar-title">Detalle de Empleado</h4>
                            <Row className="calendar-filters">
                                <Col xs={6} className="calendar-filter">
                                    <Select
                                        isMulti
                                        name="colors"
                                        options={colourOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
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

                                <Col xs={3} className="calendar-filter">
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
                <ModalVentasAsistencia />
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



export default DetallesEmpleados;
