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
import DashboardLayout from "@/app/(home)/layout";
import { Fragment } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import Card from 'react-bootstrap/Card';
import Select from 'react-select'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getEmployees, getStores, getSales } from "@/app/data/api";
import 'styles/theme/components/_calendar.scss';
import ModalVentasAsistencia from "../../customcomponent/ModalVentasAsistencia";


const events = [
    {
        title: "$2,500",
        start: getDate("YEAR-MONTH-06"),
        backgroundColor: "#64EA8F",
    },
]

// const colourOptions = [
//     { value: 'VS Albrook', label: 'VS Albrook' },
//     { value: 'BBW Albrook', label: 'BBW Albrook' },
//     { value: 'VS Multiplaza', label: 'VS Multiplaza' },
//     { value: 'BBW Multiplaza', label: 'BBW Multiplaza' }
// ]

function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
        month = "0" + month;
    }
    return dayString.replace("YEAR", year).replace("MONTH", month);
}



function Ventas() {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [storesOption, setStoresOption] = useState([]);
    const [sales, setSales] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cont = useRef(0);
    const [yearValue, setYearValue] = useState('');
    const [monthValue, setMonthValue] = useState('');
    const [calendarValue, setCalendarValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const sales = await getSales();
            const stores = await getStores();
            console.log(sales);
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
                    <Card>
                        <Card.Body>
                            <h4 className="calendar-title">Ventas en Tienda</h4>
                            <Row className="calendar-filters">
                                <Col xs={6} className="calendar-filter">
                                    <Select
                                        isMulti
                                        name="colors"
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
                                                onChange={(newValue) => calendarFilters(setYearValue(newValue), 'año')}
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
                                                onChange={(newValue) => calendarFilters(setMonthValue(newValue), 'mes')}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Col>
                            </Row>

                            <br></br>

                            {/* calendar.gotoDate( date ) */}
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



export default Ventas;
