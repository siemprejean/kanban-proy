'use client'
// import node module libraries
import React from "react";
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DashboardLayout from "../../home/layout";
import { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import 'styles/theme/components/_calendar.scss';
import { getCompanies, getEmployees, getPayrolls, getPositions, getSellerSummaries, getStores,getStore_Sales } from "@/app/data/api";
import MuiTextField from "../../customcomponent/formcontrol";
import { useRouter } from "next/navigation";
import DropdownSelect_v2 from "../../customcomponent/DropdownSelect_v2";
import 'styles/theme/components/_dateRangePicker.scss'
import 'styles/theme/components/_DropdownSelect_v2.scss'
import 'styles/theme/components/_tablaResumenEmpl.scss'

export default function DetallesEmpleados() {
    useEffect(() => {
        CargarData();
    },[]);

    //const [startDate, setStartDate] = useState(new Date());
    const [detail, setDetail] = useState({fullname: "", cargo:"", tienda:"", local: "", empresa: "", num_empl: "", num_card: "", fecha_in: "", turnos: "", dias_libres: ""});
    const [dataReport, setDataReport] = useState(null);
    const handleClose = () => setShow(false);

    const [payrolls, setPayrolls] = useState([]);
    const [stores, setStores] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [positions, setPositions] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [employeestore, setEmployeestore] = useState([]);
    const router = useRouter();
    const [sellerSumaries, setSellerSumaries] = useState([])
    const [dataTabla, setdataTabla ] = useState([])

    const CargarData = async () => {
        try {
            const data_payrolls = await getPayrolls();
            const data_employees = await getEmployees();
            const data_companies = await getCompanies();
            const data_positions = await getPositions();

                const updatedemployees = data_employees.map(emp => ({
                    ...emp,
                    label: ('(' + emp.identification + ')' + ' ' + emp.first_name+ ' ' + emp.last_name),
                    fullname: (emp.first_name+ ' ' + emp.last_name),
                }));
                  
                const updatedPayrolls = data_payrolls.map(x => {
                 
                    return {
                     ...x,
                      label: x.description.replace("Payroll for", "Planilla ")
                    };
                });

                setEmployees(updatedemployees);
                setCompanies(data_companies);
                setPositions(data_positions);
                setPayrolls(updatedPayrolls);
            } catch (error) {
                console.error('Error cargando data inicial:', error);
        }
    };

    const defaultDetail = {
        fullname: "", cargo: "", tienda: "", local: "",
        empresa: "", num_empl: "", num_card: "",
        fecha_in: "", turnos: "", dias_libres: ""
      };

    const handleChangePayrolls = async (event) => {
        const selected = parseInt(event);
        console.log(selected)
        const dataSeller = await getSellerSummaries(selected);
        const storeData = await getStore_Sales(selected);

        let updatedDataTest = [];

        if (dataSeller.length === 0) {
            alert("Debe seleccionar una planilla que contenga informacion"); // or console.log(...) or show in UI
            setdataTabla([]);
            setDetail(defaultDetail);
            setStores([]);
            setEmployeestore([]);
            return;
        } else if (storeData.length === 0) {
            alert("Debe seleccionar una planilla que contenga tiendas asociadas");
            setStores([]);
            setEmployeestore([]); // or console.log(...) or show in UI
        } else {
        updatedDataTest = dataSeller.map(x => {
        const matchedEmployee = employees.find(e => e.id === x.employee_id);
            return {
                ...x,
                cedula: matchedEmployee?.identification || "Sin Cédula",
            };
        });

        console.log(updatedDataTest)
        setSellerSumaries(updatedDataTest)        
        const storeNames = storeData.map((store, index) => ({
            id: index, // or store.id if it exists
            label: store.store_name
          }));
        setStores(storeNames);
        }
    };

    const handleChangeStores = async (event) => {
        const selectedStore = parseInt(event);
      
        const updatedataTabla = sellerSumaries.filter((item) => item.store_id === selectedStore);
      
        if (updatedataTabla.length === 0) {
            alert("Debe seleccionar una tienda que contenga información de empleados");
            setdataTabla([]);
            setDetail(defaultDetail);
            setEmployeestore([]);
            return; // Stop further execution
          }

        setdataTabla(updatedataTabla);
      
        const filtro_empl = [
          { id: 0, label: "Todos los empleados" }, // Neutral option
          ...employees
            .filter((emp) =>
              sellerSumaries.some(
                (summary) => summary.employee_id === emp.id && summary.store_id === selectedStore
              )
            )
            .map((emp) => ({
              id: emp.id,
              label: `(${emp.identification}) ${emp.fullname}`,
            })),
        ];
      
        setEmployeestore(filtro_empl);
      };      

    const handleChangeEmployee = async (event) => {
        const selectedEmployee = parseInt(event);

        if (selectedEmployee === 0) {
            // Show everything (no filter)
            setdataTabla(sellerSumaries);
            setDetail(defaultDetail);
            return;
        }          

        const updatedDataTest = sellerSumaries.filter((item) => item.employee_id === selectedEmployee)
     
        setdataTabla(updatedDataTest)

        const data_emple = employees.filter((item) => item.id === selectedEmployee)
        .map((item) => ({
          ...item
        }));

        if (data_emple.length > 0) {
            const data_empresa = companies.filter((item) => item.id === data_emple[0].company_id)
            .map((item) => ({
              ...item
            }));
    
            const data_cargo = positions.filter((item) => item.id === data_emple[0].position_id)
            .map((item) => ({
              ...item
            }));

            const data_tienda = stores.filter((item) => item.id === data_emple[0].store_id)
            .map((item) => ({
              ...item
            }));
           
            const newDetail = {
                fullname:  data_emple[0].fullname,
                cargo: data_cargo[0].name,
                tienda: data_tienda[0].store_name,
                local: "****",
                empresa: data_empresa[0].name,
                num_empl:  data_emple[0].id,
                num_card:  data_emple[0].card_number,
                fecha_in:  data_emple[0].start_date,
                turnos: "****",
                dias_libres: "****",
              }

            setDetail(newDetail);
        }
    };

    const handleShow = ( event,typex) => {
        if(typex == 1)
        {
        const [year, month, day] = event.split('-').map(Number);
        const date = new Date(year, month - 1, day);
  
        // Opciones de formato en español
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

           const dx =  {
                fecha:  date.toLocaleDateString('es-ES', options),
                fullname: detail.fullname,
                cargo: detail.cargo,
                turno: "****",
                ordinarias: "****",
                certificadoMedico: "****",
                ausenciaJustificada: "****",
                tardanzaJustificada: "****",
                comentarios: "****",
                detallesTurno: [
                  {
                    tienda: detail.tienda,
                    entrada: "***",
                    entradaDescanso: "***",
                    salidaDescanso: "***",
                    salida: "***",
                    turno: "***"
                  }
                ],
                ventasHoy: "***",
                ventasMensuales: "***",
                porcentajeVentaMeta: "***",
                porcentajeVentasTiendaHoy: "***",
                incentivo: "***"
              }
              setDataReport(dx)             
            
            
        }
        else if(typex == 2)
        {

        }else if(typex == 3)
        {

        }
        settypex(typex);
        setShow(true);

    };
    


    return (
        <DashboardLayout>
        <Head>
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
            <Fragment>
                <Container fluid className="calendar-container">
                    <Card>
                        <Card.Body>
                            <h4 className="calendar-title">Resumen de Empleados</h4>
                            <Row className="calendar-filters">
                                <Col xs={3} className="calendar-filter">   

                                <DropdownSelect_v2 label={"Seleccione Planilla"} options={payrolls} className = "custom-dropdown" onChange= {handleChangePayrolls}/>             
                                    {/* <MuiSelect_v2 text={"Seleccione Tienda"} items={stores} value={tienda} onChange={handleChangeStores} className="modal-col-12" /> */}
                                </Col>
                                <Col xs={3} className="calendar-filter">   

                                <DropdownSelect_v2 label={"Seleccione Tienda"} options={stores} className = "custom-dropdown" onChange= {handleChangeStores} disabled={stores.length === 0}/>             
                                    {/* <MuiSelect_v2 text={"Seleccione Tienda"} items={stores} value={tienda} onChange={handleChangeStores} className="modal-col-12" /> */}
                                </Col>
                                <Col xs={3} className="calendar-filter">

                                <DropdownSelect_v2 label={"Seleccione empleado"} options={employeestore} className = "custom-dropdown" onChange={handleChangeEmployee} disabled={employeestore.length === 0}/>
                                </Col>
                                <Col xs={3} className="calendar-filter">
                                </Col>
                               
                            </Row>
                            <br></br>
                            <Row>
                                <Col xs={5} className="calendar-filter">
                                    <Row>
                                       
                                        <MuiTextField title="Nombre Completo:" value={detail.fullname} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Cargo:" value={detail.cargo} className="calendar-col-6" />
                                    </Row>                                   
                                    
                                </Col>
                                <Col xs={5} className="calendar-filter">
                                    <Row>
                                        <MuiTextField title="Nº Empleado:" value={detail.num_empl} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Empresa:" value={detail.empresa} className="calendar-col-6" />
                                    </Row>
                                </Col>
                            </Row>
                            <br></br>
                            <div className="table-container">
                            <table className="custom-table">
                                <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                    <th>Venta <br />Individual</th>
                                    <th>Venta Total</th>
                                    <th>Descuento</th>
                                    <th>% Inicial</th>
                                    <th>% Ajuste</th>
                                    <th>% Nuevo</th>
                                    <th>Incentivo Inicial</th>
                                    <th>% Retención</th>
                                    <th>Incentivo <br /> con Retención</th>
                                    <th>Incentivo <br />por Excedente</th>
                                    <th>Incentivo <br /> Domingo</th>
                                    <th>Total Incentivo</th>
                                    <th>Total Vale</th>
                                    <th>Total Salario</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataTabla.length > 0 ? (
                                    dataTabla.map((x, index) => (
                                    <tr key={index}>
                                        <td>{x.cedula}</td>
                                        <td>{x.first_name + ' ' + x.last_name}</td>
                                        <td>{x.individual_sale}</td>
                                        <td>{x.total_sale}</td>
                                        <td>{x.total_sale_discount}</td>
                                        <td>{x.initial_percentage}</td>
                                        <td>{x.adjustment_percentage}</td>
                                        <td>{x.new_percentage}</td>
                                        <td>{x.initial_incentive}</td>
                                        <td>{x.percentage_to_retain}</td>
                                        <td>{x.incentive_with_retention}</td>
                                        <td>{x.surplus_incentive}</td>
                                        <td>{x.sunday_incentive}</td>
                                        <td>{x.total_incentive}</td>
                                        <td>{x.total_voucher}</td>
                                        <td>{x.total_salary}</td>
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

                        </Card.Body>
                    </Card>
                </Container>
            </Fragment>
            
        </DashboardLayout>
    );
}