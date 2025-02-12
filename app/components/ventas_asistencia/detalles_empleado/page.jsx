'use client'
// import node module libraries
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DashboardLayout from "../../home/layout";
import { Fragment } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import Card from 'react-bootstrap/Card';

//import DatePicker from 'react-datepicker';
import 'styles/theme/components/_calendar.scss';
import ModalVentasEmpleado from "../../customcomponent/ModalVentasEmpleado";
import { getCompanies, getEmployees, getPayrolls, getPositions, getStores, getSellerSummariesDaily } from "@/app/data/api";
import MuiTextField from "../../customcomponent/formcontrol";
import { useRouter } from "next/navigation";
import BasicDateRangePicker from  "../../customcomponent/BasicDateRangePicker";
import DropdownSelect_v2 from "../../customcomponent/DropdownSelect_v2";
import 'styles/theme/components/_dateRangePicker.scss'
import 'styles/theme/components/_DropdownSelect_v2.scss'


const dataTabla = {
    fecha: "Lunes, 2 de octubre de 2023",
    fullname: "Julio Ernesto Pérez González",
    cargo: "Asesor de Ventas",
    turno: "Turno B (8am - 4pm)",
    ordinarias: "08:01",
    certificadoMedico: "00:00",
    ausenciaJustificada: "00:00",
    tardanzaJustificada: "00:00",
    comentarios: "",
    detallesTurno: [
      {
        tienda: "ADIDAS - ALBROOK",
        entrada: "8:00 am",
        entradaDescanso: "12:02 pm",
        salidaDescanso: "1:01 pm",
        salida: "4:00 pm",
        turno: "Turno B (8am - 4pm)"
      }
    ],
    ventasHoy: "78.85",
    ventasMensuales: "496.85",
    porcentajeVentaMeta: "15.50% / 20%",
    porcentajeVentasTiendaHoy: "34.00%",
    incentivo: "18.50"
  };





/* function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
        month = "0" + month;
    }
    return dayString.replace("YEAR", year).replace("MONTH", month);
} */

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}



export default function DetallesEmpleados() {

    const id_payroll = useRef(null);
    const id_employee = useRef(null);
    const id_store = useRef(null)
    const [show, setShow] = useState(false);
    const [typex, settypex] = useState(1);
    //const [startDate, setStartDate] = useState(new Date());
    const [detail, setDetail] = useState({fullname: "", cargo:"", tienda:"", local: "", empresa: "", num_empl: "", num_card: "", fecha_in: "", turnos: "", dias_libres: ""});
    const [dataReport, setDataReport] = useState(null);
    const handleClose = () => setShow(false);
    const [payrolls, setPayrolls] = useState([])
    const [stores, setStores] = useState([0]);
    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([0]);
    const [positions, setPositions] = useState([0]);
    const [employeestore, setEmployeestore] = useState([0]);
    const [tiendasFiltradas, setTiendasFiltradas] = useState([])
    //const colourOptions = stores.map((item) => ({ value: item.id, label: item.name }));
    const router = useRouter();
    //const token = localStorage.getItem('token');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [events, setEvents] = useState([]);


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


                
                const updatedStores = data_store.map(store =>  
                ({
                    ...store,
                    label: store.store_name,
                  
                  }));

                  const updatedemployees = data_employees.map(emp =>  
                  ({
                    ...emp,
                    label: ('(' + emp.identification + ')' + ' ' + emp.first_name+ ' ' + emp.last_name),
                    fullname: (emp.first_name+ ' ' + emp.last_name), 
                  }));

                  const upd1 = stores.map(item => ({
                    ...item,
                    label: item.store_name
                  }));
            
                  const months = [
                    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
                    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                  ];
            
                  const updatedPayrolls = data_payrolls.map(x => 
                  ({
                    ...x,
                    label: months[new Date(x.start_date).getMonth()] + ' (' + new Date(x.start_date).getFullYear() + ')',
                  }));



              const data_payrollsDaily = await getSellerSummariesDaily( id_payroll.current,  id_store.current,  id_employee.current);
            
               const formattedEvents = data_payrollsDaily.map((evento) => ({
                  
                    title: evento.total_daily_sale,
                    start: new Date(evento.registration_date.time).toLocaleDateString(),
                    description: evento.sale_discount,
                   // backgroundColor:'blue'
                  }));  
              

               setEvents(formattedEvents);
                setPayrolls(updatedPayrolls)
                setStores(updatedStores);
                setEmployees(updatedemployees);
                setCompanies(data_companies);
                setPositions(data_positions);
                setTiendasFiltradas(upd1);
                //setEmployees(employee);
                
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
 
      const handleChangePayrolls = async (e) =>{
    
            const store_summaries= await getStore_Sales(e)
            setStores_sales(store_summaries);
            setStores_sales_filtro(store_summaries)
            setTiendasFiltradas(tiendasFiltradas)
          }
      
    

    const handleChangeStores = async (event) => {
        const selectedStore = parseInt(event);
        //setTiendas(selectedStore);
     
        

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
          //    local: "",
              empresa: "",
              num_empl: "",
              num_card: "",
              fecha_in: "",
         //     turnos: "",
        //      dias_libres: "",
            },
          );
    };

    const handleChangeEmployee = async (event) => {
        const selectedEmployee = parseInt(event);

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
              //  local: "****",
                empresa: data_empresa[0].name,
                num_empl:  data_emple[0].id,
                num_card:  data_emple[0].card_number,
                fecha_in:  data_emple[0].start_date,
             //   turnos: "****",
              //  dias_libres: "****",
              }

            setDetail(newDetail);
        }else{
            setDetail(
                {
                  fullname: "",
                  cargo: "",
                  tienda: "",
                 // local: "",
                  empresa: "",
                  num_empl: "",
                  num_card: "",
                  fecha_in: "",
                //  turnos: "",
               //   dias_libres: "",
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
        console.log(dataReport)
        settypex(typex);
        setShow(true);

    };
    


    return (
        <DashboardLayout>
            <Fragment>
                <Container fluid className="calendar-container">
                    <Card>
                        <Card.Body>
                            <h4 className="calendar-title">Detalles de Empleado </h4>
                            <Row className="calendar-filters">

                            <Col xs={4} className="calendar-filter">
                                <DropdownSelect_v2 label={" Seleccione la planilla"} options={payrolls} className = "custom-dropdown" onChange={handleChangePayrolls} />
                                </Col>

                                <Col xs={3} className="calendar-filter">   

                                <DropdownSelect_v2 label={"Seleccione Tienda"} options={stores} className = "custom-dropdown" onChange= {handleChangeStores}/>             
                                    {/* <MuiSelect_v2 text={"Seleccione Tienda"} items={stores} value={tienda} onChange={handleChangeStores} className="modal-col-12" /> */}
                                </Col>
                                <Col xs={3} className="calendar-filter">

                                <DropdownSelect_v2 label={"Seleccione empleado"} options={employeestore} className = "custom-dropdown" onChange={handleChangeEmployee} />
                                    {/* <MuiSelect_v2 text={"Seleccione Empleado"} items={employeestore} value={empleado} onChange={handleChangeEmployee} className="modal-col-12" /> */}
                                </Col>

                         

                             {/*    <Col xs={4} className="calendar-filter">
                                <BasicDateRangePicker></BasicDateRangePicker>
                                </Col> */}

                                

                               
                            </Row>
                            <br></br>
                            <Row>
                                <Col xs={4} className="calendar-filter">
                                    <Row>
                                       
                                        <MuiTextField title="Nombre Completo:" value={detail.fullname} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Cargo:" value={detail.cargo} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Tienda:" value={detail.tienda} className="calendar-col-6" />
                                    </Row>
                                  {/*   <Row>
                                        <MuiTextField title="Localidad:" value={detail.local} className="calendar-col-6" />
                                    </Row> */}
                                    <Row>
                                        <MuiTextField title="Empresa:" value={detail.empresa} className="calendar-col-6" />
                                    </Row>
                                </Col>
                                <Col xs={4} className="calendar-filter">
                                    <Row>
                                        <MuiTextField title="Nº Empleado:" value={detail.num_empl} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Nº Tarjeta:" value={detail.num_card} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Fecha de Inicio:" value={detail.fecha_in} className="calendar-col-6" />
                                    </Row>
                                  {/*   <Row>
                                        <MuiTextField title="Turnos:" value={detail.turnos} className="calendar-col-6" />
                                    </Row>
                                    <Row>
                                        <MuiTextField title="Días Libres:" value={detail.dias_libres} className="calendar-col-6" />
                                    </Row> */}
                                    
                                </Col>
                    {/*             <Col xs={3} className="calendar-filter">
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
                                        dateClick={(e) => { handleShow(e.dateStr, 1)}}
                                        weekends={true}
                                       // events={events}
                                        eventContent={renderEventContent}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </Fragment>
            <Modal size="xl" show={show} onHide={handleClose}>
                <ModalVentasEmpleado data={dataReport} typex={typex}/>
            </Modal>
        </DashboardLayout>
    );
}