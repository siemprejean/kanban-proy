'use client'
import { Fragment, useRef } from "react";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';
import CardCustom from '../cards/CardCustom';
import DoughnutChart from '../sub-components/DoughnutChart'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import 'styles/theme/components/_card.scss';
import ActiveProjects from "@/app/components/sub-components/ActiveProjects";
import { useRouter } from "next/navigation";
import { validarToken } from "@/app/data/api";

// import required data files
// import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
    const [valor, setValor] = React.useState(0);
    const router = useRouter();

    useEffect(() => {
        if(validarToken() == 1 || validarToken() == 2){
            router.push('/')
        }
     })
    

    return (
        <>
            <Fragment>
                <Container style={{ maxWidth: 'revert-layer' }}>
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
