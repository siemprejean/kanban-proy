'use client'
// import node module libraries
import { Fragment } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';
import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// import widget/custom components
// import { StatRightTopIcon } from "widgets";

// import sub components
// import { ActiveProjects, Teams, 
//     TasksPerformance 
// } from "sub-components";

// import required data files
// import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
    return (
        <Fragment>
            {/* <div className="bg-primary pt-10 pb-21"></div> */}
            hola mundo
            <Container >
                <Row>
                    <Col sm={8} style={{ background: 'blue' }}>
                        <Row>
                            <Col sm={6} style={{ background: '#cc2e2e' }}>ROW1</Col>
                            <Col sm={6} style={{ background: '#cc2e2e' }}>ROW1</Col>
                        </Row>
                        <Row>
                            <Col sm={6} style={{ background: '#cc2e2e' }}>ROW2</Col>
                            <Col sm={6} style={{ background: '#cc2e2e' }}>ROW2</Col>
                        </Row>

                        <Row>
                            <Col sm={12} style={{ background: '#cc2e2e' }}>ROW3</Col>
                        </Row>

                        <Row>
                            <Col sm={6} style={{ background: '#cc2e2e' }}>ROW4</Col>
                            <Col sm={6} style={{ background: '#cc2e2e' }}>ROW4</Col>
                        </Row>
                    </Col>
                    <Col sm={4} style={{ background: '#c2c2c2' }}>sm=4</Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;
