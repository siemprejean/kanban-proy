'use client'
// import node module libraries
import React from "react";

import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

import DashboardLayout from "../../home/layout";
import { Fragment } from "react";

import Card from 'react-bootstrap/Card';

//import DatePicker from 'react-datepicker';
import 'styles/theme/components/_calendar.scss';
import { getCompanies, getEmployee, getEmployees, getPayrolls, getPositions, getSellerSummaries, getStores } from "@/app/data/api";

import MuiTextField from "../../customcomponent/formcontrol";

import { useRouter } from "next/navigation";

import DropdownSelect_v2 from "../../customcomponent/DropdownSelect_v2";
import 'styles/theme/components/_dateRangePicker.scss'
import 'styles/theme/components/_DropdownSelect_v2.scss'
import 'styles/theme/components/_tablaResumenEmpl.scss'










export default function DetallesEmpleados() {


    const [show, setShow] = useState(false);
    const [typex, settypex] = useState(1);
    //const [startDate, setStartDate] = useState(new Date());
    const [detail, setDetail] = useState({fullname: "", cargo:"", tienda:"", local: "", empresa: "", num_empl: "", num_card: "", fecha_in: "", turnos: "", dias_libres: ""});
    const [dataReport, setDataReport] = useState(null);
    const handleClose = () => setShow(false);

    const [payrolls, setPayrolls] = useState([0]);
    const [stores, setStores] = useState([0]);
    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([0]);
    const [positions, setPositions] = useState([0]);

    const [payrollstores, setPayrollstores] = useState([0]);
    const [employeestore, setEmployeestore] = useState([0]);

    //const colourOptions = stores.map((item) => ({ value: item.id, label: item.name }));
    const router = useRouter();
    //const token = localStorage.getItem('token');
    const [dateRange, setDateRange] = useState([null, null]);
    const [sellerSumaries, setSellerSumaries] = useState([])
    const [dataTabla, setdataTabla ] = useState([])


    useEffect(() => {


        const CargarData = async () => {
            try {
                const data_payrolls = await getPayrolls();

                const data_employees = await getEmployees();
                const data_store = await getStores();
                const data_companies = await getCompanies();
                const data_positions = await getPositions();
                // const storeemployee = store.map((items) => ({
                //     ...items,
                //     employeesd: employee.filter((employe) => employe.id_store === items.id)
                // }));
               

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
                  
                  console.log(updatedPayrolls);
                  

                  console.log("Estas son las Planillas")
                  console.log(updatedPayrolls)


                  const updatedStores = data_store.map(store => ({
                    ...store,
                    label: store.store_name,
                  }));

                setEmployees(updatedemployees);
                setCompanies(data_companies);
                setPositions(data_positions);

                setPayrolls(updatedPayrolls)
                setStores(updatedStores)
                //console.log("Esto tiene employeestore", employeestore)
            } catch (error) {
                console.error('Error cargando data inicial:', error);
            }
        };
        CargarData();

        // Decodificar el token JWT para obtener su contenido
        //const tokenData = JSON.parse(atob(token.split('.')[1]));

        // Obtener la fecha de expiración del token del campo "exp"
        //const expirationTime = tokenData.exp;

        // Convertir la fecha de expiración a milisegundos
        //const expirationTimeMillis = expirationTime * 1000;

        // Obtener la fecha actual en milisegundos
        //const currentTimeMillis = new Date().getTime();

        // Verificar si el token ha expirado
        // if (currentTimeMillis > expirationTimeMillis) {
        //     console.log('El token ha expirado');
        //     router.push('/components/login');
        // } else {
        //     fetchData();
        //     console.log('El token está activo');
        // }

    }, []);

 

    
    // const fetchDetail = async (id) => {
    //     try {
    //         console.log("Esto tiene id", id)
    //         const employee = await getEmployee(id);
    //         const store = await getStores();
    //         const employeesstore = {
    //             ...employee,
    //             store: store.filter((store) => store.id === employee.id_store)
    //         };
    //         console.log("Esto tiene employeesstore", employeesstore)
    //         setDetail(employee);
    //         //setStores(store);
    //         //console.log("Esto tiene employeestore", employeestore)
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }
 
    const handleChangePayrolls = async (event) => {
        const selected = parseInt(event);
        const dataSeller = await getSellerSummaries(selected);

        const updatedDataTest = dataSeller.map(x => {
            const matchedEmployee = employees.find(e => e.id === x.employee_id);
            return {
            ...x,
            cedula: matchedEmployee?.identification || "Sin Cédula",
            };
            });

        setSellerSumaries(updatedDataTest)
        setdataTabla(updatedDataTest)
        
    
        const updatedStores = stores.filter((item) => item.payroll_id === selected).map(store => ({
            ...store,
            label: store.store_name,
          }));

        setPayrollstores(updatedStores)
        setEmployeestore([])
        setDetail(
            {
              fullname: "",
              cargo: "",
              tienda: "",
              local: "",
              empresa: "",
              num_empl: "",
              num_card: "",
              fecha_in: "",
              turnos: "",
              dias_libres: "",
            },
          );
    };

    const handleChangeStores = async (event) => {
        const selectedStore = parseInt(event);
        //setTiendas(selectedStore);

        const updatedataTabla = sellerSumaries.filter((item) => item.store_id === selectedStore)
        
        setdataTabla(updatedataTabla)

        const filtro_empl = employees.filter((item) => item.store_id === selectedStore)
        .map((item) => ({
          ...item
        }));
        setEmployeestore(filtro_empl); 

        setDetail(
            {
              fullname: "",
              cargo: "",
              tienda: "",
              local: "",
              empresa: "",
              num_empl: "",
              num_card: "",
              fecha_in: "",
              turnos: "",
              dias_libres: "",
            },
          );
    };

    const handleChangeEmployee = async (event) => {
        const selectedEmployee = parseInt(event);

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
        }else{
            setDetail(
                {
                  fullname: "",
                  cargo: "",
                  tienda: "",
                  local: "",
                  empresa: "",
                  num_empl: "",
                  num_card: "",
                  fecha_in: "",
                  turnos: "",
                  dias_libres: "",
                },
              );
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

                                <DropdownSelect_v2 label={"Seleccione Tienda"} options={stores} className = "custom-dropdown" onChange= {handleChangeStores}/>             
                                    {/* <MuiSelect_v2 text={"Seleccione Tienda"} items={stores} value={tienda} onChange={handleChangeStores} className="modal-col-12" /> */}
                                </Col>
                                <Col xs={3} className="calendar-filter">

                                <DropdownSelect_v2 label={"Seleccione empleado"} options={employeestore} className = "custom-dropdown" onChange={handleChangeEmployee} />
                                    {/* <MuiSelect_v2 text={"Seleccione Empleado"} items={employeestore} value={empleado} onChange={handleChangeEmployee} className="modal-col-12" /> */}
                                </Col>
                                <Col xs={3} className="calendar-filter">

                                    {/* <MuiSelect_v2 text={"Seleccione Empleado"} items={employeestore} value={empleado} onChange={handleChangeEmployee} className="modal-col-12" /> */}
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
                                {/* <Col xs={3} className="calendar-filter">
                                    <Row>
                                        <Button style={{ height:"70px", borderRadius: "10px", backgroundColor: "#03386a", color: "HighlightText", flex: "auto", marginTop: "10px",  marginBottom: "20px",  marginLeft:"30px", marginRight:"30px" }} onClick={() => { handleShow(2) }}>
                                            Historico de Ventas
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button style={{ height:"70px", borderRadius: "10px", backgroundColor: "#03386a", color: "HighlightText", flex: "auto", marginTop: "10px", marginBottom: "20px", marginLeft:"30px", marginRight:"30px" }} onClick={() => { handleShow(3) }}>
                                        Historico de Comisiones
                                        </Button>
                                    </Row>
                                </Col> */}
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