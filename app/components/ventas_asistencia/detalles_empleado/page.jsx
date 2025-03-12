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
import 'styles/theme/components/_calendar.scss';
import ModalVentasEmpleado from "../../customcomponent/ModalVentasEmpleado";
import { getCompanies, getEmployees, getPayrolls, getPositions, getStores, getSellerSummariesDaily,  getStore_Sales, getEmployeeActives} from "@/app/data/api";
import MuiTextField from "../../customcomponent/formcontrol";
import { useRouter } from "next/navigation";
import BasicDateRangePicker from  "../../customcomponent/BasicDateRangePicker";
import DropdownSelect_v2 from "../../customcomponent/DropdownSelect_v2";
import 'styles/theme/components/_dateRangePicker.scss'
import 'styles/theme/components/_DropdownSelect_v2.scss'
import { Rock_3D } from "next/font/google";
import { Description } from "@mui/icons-material";
import esLocale from "@fullcalendar/core/locales/es"; 
import { Helmet } from 'react-helmet';


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

   
    const [show, setShow] = useState(false);
    const [typex, settypex] = useState(1);
    const [detail, setDetail] = useState({fullname: "", cargo:"", tienda:"", local: "", empresa: "", num_empl: "", num_card: "", fecha_in: "", turnos: "", dias_libres: ""});
    const [dataReport, setDataReport] = useState(null);
    const handleClose = () => setShow(false);
    const [payrolls, setPayrolls] = useState([])
    const [stores, setStores] = useState([0]);
    const [employees, setEmployees] = useState([]);
    const [employeesactive, setEmployeesActive] = useState([]);
    const [companies, setCompanies] = useState([0]);
    const [positions, setPositions] = useState([0]);
    const [stores_sales,  setStores_sales] = useState([])
    const [stores_sales_filtro,  setStores_sales_filtro] = useState([])
    const [employeestore, setEmployeestore] = useState([0]);
    const [tiendasFiltradas, setTiendasFiltradas] = useState([])
    //const colourOptions = stores.map((item) => ({ value: item.id, label: item.name }));
    const router = useRouter();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [events, setEvents] = useState([]);
    const [inicio, setInicio] = useState([]);
  


    useEffect(() => {


        const CargarData = async () => {
            try {
                const data_payrolls = await getPayrolls();
                const data_employees = await getEmployees();
                const data_employees_active = await getEmployeeActives(); 
                const data_store = await getStores();
                const data_companies = await getCompanies();
                const data_positions = await getPositions();
              /*   const data_seller_summaries_daily  = await  getSellerSummariesDaily(3,1,129)
                const detalle_empleado = data_seller_summaries_daily.map((item) => ({         
                        title:item.total_daily_sale,
                        start:item.registration_date, 
                    
                })); */
               // const total_diario = data_seller_summaries_daily[2].total_daily_sale

         
        /* 
                const formattedEvents = data_seller_summaries_daily.map((evento) => ({
                  title: evento.total_daily_sale,
                  start: new Date(evento.registration_date.time).toLocaleDateString(),
                  description: evento.sale_discount,
                   backgroundColor:'blue'
                }));   
   */
        //     setEvents(detalle_empleado);  
              console.log(events) 

          
                
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
            
                  const updatedPayrolls = data_payrolls.map(x => {
                 
                    return {
                      ...x,
                      label: x.description.replace("Payroll for", "Planilla ")
                    };
                  });


            
             /*    const formattedEvents = data_payrollsDaily.map((evento) => ({
                  
                    title: evento.total_daily_sale,
                    start: new Date(evento.registration_date.time).toLocaleDateString(),
                    description: evento.sale_discount,
                   // backgroundColor:'blue'
                  }));   
               */

               // setEvents(formattedEvents);
                setPayrolls(updatedPayrolls)
                setStores(updatedStores);
                setEmployees(updatedemployees);
                setEmployeesActive(data_employees_active);
                setCompanies(data_companies);
                setPositions(data_positions);
                setTiendasFiltradas(upd1);
                
               
            } catch (error) {
                console.error('Error cargando data inicial:', error);
            }
        };
       CargarData();
     

    }, []);

 
 /* EVENTO DE PLANILLA*/
      const handleChangePayrolls = async (e) =>{
            const store_summaries= await getStore_Sales(e)
            setStores_sales(store_summaries);
            setStores_sales_filtro(store_summaries)
            setTiendasFiltradas(tiendasFiltradas)
          }
      


/*EVENTO DE TIENDAS */
    const handleChangeStores = async (event) => {
        const selectedStore = parseInt(event);
        //setTiendas(selectedStore);

        const activos = employeesactive.map(act => act.employee_id);

if(activos.length > 0  && employees.length >0){ 
   
 const filtro_empl = employees.filter((item) => item.store_id === selectedStore && activos.includes(item.id) )
           .map((item) => ({
          ...item
        })); 
   
     console.log(filtro_empl)
     console.log(activos)
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
}
    };




    /*EVENTO DE EMPLEADOS*/
    const handleChangeEmployee = async (event) => {
        const selectedEmployee = parseInt(event);

    const data_emple = employees.filter((item) => item.id === selectedEmployee )
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

/* DATOS DEL CALENDARIO */


            const data_seller_summaries_daily  = await  getSellerSummariesDaily(stores_sales[0].payroll_id,data_emple[0].store_id,data_emple[0].id,)
           
            const detalle_empleado = data_seller_summaries_daily.map((item) =>   ({   
                 
                    title:item.total_daily_sale,
                    start:item.registration_date,
                    description:item.sale_discount,
                    color:(item.attendance === true) ? '#64ea8f' : '#e8b19a'
                
            }));

         setEvents(detalle_empleado);  


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
    }

  





/* MODAL  */
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
        <Helmet>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> </meta>
      </Helmet>
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
                                        locale="es"
                                        locales={[esLocale]} 
                                        events={events}
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