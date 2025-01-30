'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { Nav, Navbar, Form, Card } from 'react-bootstrap';

import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getBrands, getStore, getStores, postStore, putStore, getStore_Sales } from "@/app/data/api";
import MuiTable from "../customcomponent/table";
import MuiFormControl from "../customcomponent/formcontrol";
import MuiModal from "../customcomponent/modal";
import MuiDialog from "../customcomponent/dialog";
import './style.css';
import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';
import { VerifiedOutlined } from "@mui/icons-material";
import MuiSelect from "../customcomponent/Select";


export default function Store() {


  //Resumen de tiendas
  const [stores_sales, setStores_sales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    fetchTienda(); 
  }, []);

  //DATA DE RESUMEN DE TIENDA
  const fetchTienda = async () => {
    try {
      const store= await getStore_Sales()
      setStores_sales(store);
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   

  return (
    <>

   {/* TABLA DE RESUMEN DE TIENDAS  */}
   <DashboardLayout>


    <br></br>
    <Card >
        <Card.Body>
            <h3>Resumen de tiendas </h3>

            <Row >
                <Col xs={5} md={3}>
                   
                </Col></Row>
            <br></br>
            <Row className="App">
            
                <Col >
              
                    <Table  responsive >
                        <thead>
                            <tr>
                           
                            <th><h5 style={{ fontWeight: "900" }}>Fecha</h5></th>
                            <th><h5 style={{ fontWeight: "900" }}>Tienda</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Porcentaje de retención</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Meta de ventas</h5></th>
                                <th> <h5 style={{ fontWeight: "900" }}>Diferencia entre la meta y lo que se logró</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Porcentaje de la meta</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Total de empleados</h5></th>
                                <th> <h5 style={{ fontWeight: "900" }}>Excedente de venta</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Total de venta</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Total de vendedores</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Total de venta domingos</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Porcentaje de incencitvo domingos</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Incentivo domingos</h5></th>
                                <th><h5 style={{ fontWeight: "900" }}>Vendedores domingos</h5></th>
                            </tr>
                        </thead>
                        {stores_sales.length != null && (
                            <tbody>
                                {stores_sales?.map(get => (
                                     <tr key={get.id}>
                                        <td  >{get.start_date }</td>
                                        <td >{get.store_name} </td>
                                        <td >{get.retention_percentage}% </td>
                                        <td>{get.sales_goal}</td>
                                        <td  >{get.sales_goal_difference}</td>
                                        <td>{get.sales_goal_percentage}%</td>
                                        <td >{get.total_employess}</td>
                                        <td >{get.sales_surplus} </td>
                                        <td>{get.total_sales}</td>
                                        <td  >{get.total_sellers}</td>
                                        <td  >{get.total_sunday_sales}</td>
                                        <td  >{get.sunday_incentive_percentage}</td>
                                        <td  >{get.sunday_incentive}</td>
                                        <td  >{get.sunday_sellers}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </Table>
                  
                </Col>
           
            </Row>
        </Card.Body>
    </Card>

</DashboardLayout>

    </>
  );
}
