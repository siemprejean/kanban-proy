'use client'
import { Fragment, useRef } from "react";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';
import CardCustom from '../components/cards/CardCustom';
import { getApi } from "../data/api";
import DoughnutChart from '../components/sub-components/DoughnutChart'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import 'styles/theme/components/_card.scss';
import ActiveProjects from "@/app/components/sub-components/ActiveProjects";

// import required data files
// import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
    const [valor, setValor] = React.useState(0);
    const dir = useRef('');

    useEffect(() => {
        getEmployee();

    })

    const getEmployee = async () => {
        try {
            const res = await fetch(`http://10.2.1.174:35789/general/employees`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzA1OTk2NDA1fQ.S4eTlMACfm_3wGbZEhww8EYQR8FNCpkqF91PP1l1vuw'
                })
            });
            const data = await res.json();
            setValor(data.length)
            return data;
        }
        catch (error) {
            console.error('Error fetching employee:', error);
            throw new Error('Failed to fetch employee');
        }
    };
    
    return (
        <>
            <Fragment>
                <Container style={{maxWidth:'revert-layer'}}>
                    <Row>
                        <Col sm={8}>
                            <Row>
                                <Col sm={6}>
                                    <CardCustom
                                        data={{
                                            type: "simple",
                                            icon: "people_alt",
                                            titulo: "Empleados",
                                            valor: `${valor}`
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <CardCustom
                                        data={{
                                            type: "simple",
                                            icon: "attach_money",
                                            titulo: "Ventas Semanales",
                                            valor: "$28,800"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <CardCustom
                                        data={{
                                            type: "simple",
                                            icon: "store",
                                            titulo: "Estatus de Ventas Globales",
                                            valor: "85%"
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <CardCustom
                                        data={{
                                            type: "simple",
                                            icon: "local_grocery_store",
                                            titulo: "Pedidos Realizados",
                                            valor: "289 órdenes"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12}>
                                    <ActiveProjects />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <CardCustom
                                        data={{
                                            type: "color",
                                            icon: "people_alt",
                                            titulo: "Empleados",
                                            valor: `${valor}`
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <CardCustom
                                        data={{
                                            type: "color",
                                            icon: "attach_money",
                                            titulo: "Ventas Semanales",
                                            valor: "$28,800"
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Card className="cardDoughnutChart">
                                <CardHeader className='dashboard-card'
                                    title='Ventas en Tienda'
                                />
                                <DoughnutChart />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        </>
    )
}
export default Home;
