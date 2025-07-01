"use client";

// Importar librerías
import React from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";


const ModalVentasEmpleado = ({ data, typex}) => {
  console.log("Data Recibida")
  console.log(data)
  return (
    <>
    
    {typex === 1? (
    <>
         <Modal.Header closeButton>
        <Col sm={4}>
          <Modal.Title>Detalle del día - Empleado</Modal.Title>
        </Col>
        <Col sm={4} style={{ textAlign: "center" }}>
          <Modal.Title>{data.fecha}</Modal.Title>
        </Col>
      </Modal.Header>

      <Modal.Body>
        <Container className="modal-config-container">
          <Row>
            <Col sm={6}>
              <p><strong>Nombre Completo:</strong> {data.fullname}</p>
              <p><strong>Cargo:</strong> {data.cargo}</p>
              <p><strong>Turno:</strong> {data.turno}</p>
              <p><strong>Ordinarias:</strong> {data.ordinarias}</p>
            </Col>
            <Col sm={6}>
              <p><strong>Certificado Médico:</strong> {data.certificadoMedico}</p>
              <p><strong>Ausencia Justificada:</strong> {data.ausenciaJustificada}</p>
              <p><strong>Tardanza Justificada:</strong> {data.tardanzaJustificada}</p>
              <p><strong>Comentarios:</strong> {data.comentarios}</p>
            </Col>
          </Row>

          <h5 className="mt-4">Detalles de turno</h5>
          <Table bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Tienda</th>
                <th>Entrada</th>
                <th>Entrada Descanso</th>
                <th>Salida Descanso</th>
                <th>Salida</th>
                <th>Turno</th>
              </tr>
            </thead>
          </Table>

          <h5 className="mt-4">Detalles de ventas</h5>
          <Table bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Ventas Hoy</th>
                <th>Ventas Mensuales</th>
                <th>% Venta / Meta Mensuales</th>
                <th>% de Ventas Tienda Hoy</th>
                <th>Incentivo Hasta la Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.ventasHoy}</td>
                <td>${data.ventasMensuales}</td>
                <td>{data.porcentajeVentaMeta}</td>
                <td>{data.porcentajeVentasTiendaHoy}</td>
                <td>${data.incentivo}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
    </>

    ) : typex === 2? (
        <>
         <Modal.Header closeButton>
        <Col sm={4}>
          <Modal.Title>Histórico de Ventas</Modal.Title>
        </Col>
      </Modal.Header>

      <Modal.Body>
        <Container className="modal-config-container">
          <Table bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Ventas Hoy</th>
                <th>Ventas Mensuales</th>
                <th>% Venta / Meta Mensual</th>
                <th>% de Ventas Tienda Hoy</th>
                <th>Incentivo Hasta la Fecha</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.ventasHoy}</td>
                <td>${data.ventasMensuales}</td>
                <td>{data.porcentajeVentaMeta}</td>
                <td>{data.porcentajeVentasTiendaHoy}</td>
                <td>${data.incentivo}</td>
                <th>${data.fecha}</th>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
        </>

    ):(
        <>
        <Modal.Header closeButton>
       <Col sm={4}>
         <Modal.Title>Histórico de Comisiones</Modal.Title>
       </Col>
     </Modal.Header>

     <Modal.Body>
       <Container className="modal-config-container">
       
         <Table bordered hover className="mt-2">
           <thead>
             <tr>
               <th>Tienda</th>
               <th>Entrada</th>
               <th>Entrada Descanso</th>
               <th>Salida Descanso</th>
               <th>Salida</th>
               <th>Turno</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>${data.ventasHoy}</td>
               <td>${data.ventasMensuales}</td>
               <td>{data.porcentajeVentaMeta}</td>
               <td>{data.porcentajeVentasTiendaHoy}</td>
               <td>${data.incentivo}</td>
               <th>${data.fecha}</th>
             </tr>
           </tbody>
         </Table>
       </Container>
     </Modal.Body>
   </>

    )};

    
     
    </>
  );
};

export default ModalVentasEmpleado;
