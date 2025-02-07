'use client'

import DashboardLayout from "@/app/(home)/layout";
import Link from "next/link";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { Nav, Navbar, Form, Card } from 'react-bootstrap';
import { CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { Box, Button, FormControl, IconButton, InputLabel, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, List, ListItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, CardContent, Grid, styled, Divider, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import Select from 'react-select'
import { getBrands, getStore, getStores, postStore, putStore, getStore_Sales, getPayrolls } from "@/app/data/api";
import DropdownSelect_v2 from "../customcomponent/DropdownSelect_v2";
import 'styles/theme/components/_DropdownSelect_v2.scss'
import './style.css';
import 'styles/theme/components/_card.scss';
import 'styles/theme/components/_button.scss';
import 'styles/theme/components/_modal.scss';
import 'styles/theme/components/_tablaResumenEmpl.scss'
import { useState, useRef, useEffect } from 'react';

export default function Store() {


  //Resumen de tiendas
  const [stores_sales, setStores_sales] = useState([]);
  const [stores_sales_filtro, setStores_sales_filtro] = useState([]);
  const [payrolls, setPayrolls] = useState([])
  const [tiendas, setTiendas] = useState([]);
  const [tiendasFiltradas, setTiendasFiltradas] = useState([])
  const [searchTerm, setSearchTerm] = useState('');







  useEffect(() => {
    fetchTienda(); 
  }, []);

  //DATA DE RESUMEN DE TIENDA
  const fetchTienda = async () => {
    try {
      
      const stores = await getStores();
      const data_payrolls  = await getPayrolls();
      const upd1 = stores.map(item => ({
        ...item,
        label: item.store_name
      }));

      const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", 
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];

      const updatedPayrolls = data_payrolls.map(x => ({
        ...x,
        label: months[new Date(x.start_date).getMonth()] + ' (' + new Date(x.start_date).getFullYear() + ')',
      }));

      setPayrolls(updatedPayrolls)

    
      setTiendasFiltradas(upd1);
      setTiendas(stores);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


      //Filtro del select
      const handleChangeStores = (event) => {
        const tiendaSelect = event;
          // Filtrar por tienda
          const tiendasFiltradas = stores_sales.filter(tiendas => tiendas.store_id === tiendaSelect);
          setStores_sales_filtro(tiendasFiltradas)
        
      };

        const handleChangePayrolls = async (e) =>{

        const store_summaries= await getStore_Sales(e)
        setStores_sales(store_summaries);
        setStores_sales_filtro(store_summaries)
        setTiendasFiltradas(tiendasFiltradas)
      }
  

  return (
    <>

   {/* TABLA DE RESUMEN DE TIENDAS  */}
   <DashboardLayout>


    <br></br>
    <Card >
        <Card.Body>
            <h3>Resumen de tiendas </h3>
<br></br>
   <Col xs={6}  >
   {/* {tiendas.length != null && (
   <select  value={filtro} onChange={manejarFiltro}>
    {tiendas?.map((tienda, index) => (
        <option value={tienda.store_name} key={index}>
      {tienda.store_name}
      </option>
      ))}

      </select>
       )} */}
          
      <br></br>
    {/* <input 
                type="text" 
                placeholder="Tiendas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />  */}
          <DropdownSelect_v2 label={"Seleccione Planilla"} options={payrolls} className = "custom-dropdown" onChange= {handleChangePayrolls}/>             

          <DropdownSelect_v2 label={"Seleccione Tienda"} options={tiendasFiltradas} className = "custom-dropdown" onChange= {handleChangeStores}/>             

           </Col>    
          
            <br></br>
            <Row className="App">
            
                <Col >
                <div className="table-container">
                            <table className="custom-table">
                                <thead>
                                <tr>
                                  <th>Fecha</th>
                                  <th>Tienda</th>
                                  <th>Porcentaje <br/>retención</th>
                                  <th>Meta <br />de ventas</th>
                                  <th>Diferencia <br /> entre la meta y <br /> lo que se logró</th>
                                  <th>Porcentaje <br /> meta</th>
                                  <th>Total <br /> empleados</th>
                                  <th>Excedente<br />venta</th>
                                  <th>Total <br /> venta</th>                                
                                  <th>Porcentaje <br /> incencitvo domingos</th>
                                  <th>Incentivo domingos</th>
                                  <th>Total <br /> venta domingos</th>
                                  <th>Total <br /> vendedores</th>
                                  <th>Vendedores domingos</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stores_sales_filtro.length > 0 ? (
                                    stores_sales_filtro.map((get, index) => (
                                      <tr key={index}>
                                      <td  >({get.start_date})-({get.end_date})</td>
                                      <td >{get.store_name} </td>
                                      <td >{get.retention_percentage}% </td>
                                      <td>{get.sales_goal}</td>
                                      <td  >{get.sales_goal_difference}</td>
                                      <td>{get.sales_goal_percentage}%</td>
                                      <td >{get.total_employess}</td>
                                      <td >{get.sales_surplus} </td>
                                      <td>{get.total_sales}</td>                                      
                                      <td  >{get.sunday_incentive_percentage}</td>
                                      <td  >{get.sunday_incentive}</td>
                                      <td  >{get.total_sunday_sales}</td>
                                      <td  >{get.total_sellers}</td>
                                      <td  >{get.sunday_sellers}</td>
                                  </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="15" className="no-data">No hay datos disponibles</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            </div>
           
                </Col>
           
            </Row>
        </Card.Body>
    </Card>

</DashboardLayout>

    </>
  );
}
