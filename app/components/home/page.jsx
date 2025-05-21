'use client'
import { Fragment, useRef } from "react";
import React, { useEffect, useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import 'styles/theme/components/_card.scss';
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
          <Helmet>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    </Helmet>
            <Fragment>
                <Container style={{ maxWidth: 'revert-layer' }}>
                </Container>
            </Fragment>
        </>
    )
}
export default Home;
