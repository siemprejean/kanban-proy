'use client'
// import node module libraries
import React from "react";
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DashboardLayout from "../home/layout";
import Badge from 'react-bootstrap/Badge';
import { ModalFooter } from "react-bootstrap";
import LockIcon from '@mui/icons-material/Lock';
import Card from 'react-bootstrap/Card';
import dateFormat from 'dateformat';
import Input from '@mui/material/Input';
import { getUser, getRol } from "@/app/data/api";


const Usuarios = () => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [gets, setGets] = useState([]);
    const [usu, setUser] = useState([]);
    const [rol, setRoles] = useState([]);
    const [idModal, setModalid] = useState(null)
    const [message, setMessage] = useState('');
    const [user_password, setPassword] = useState('');
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [id_company, setIdCompany] = useState(null)
    const [role_id, setRole_id] = useState([]);
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwiZXhwIjoxNzM5MDI4NDgxfQ.VNQfaY9_56ycMw77MIZ-NPyn7Rd43qM2AAAvmISZKhA'
    const [filterValue, setFilterValue] = useState('');

 

    







    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getUser();
            const result2 = await getRol();
    
            setGets(result);
            setRoles(result2);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);



    /*MOSTRAR USUARIOS POR ID*/
    let mostrar = async (id) => {
        setUser([])
        try {
            const response = await fetch(`http://10.2.1.174:35789/admin/users/${id}`, {
                method: "GET",
                headers: new Headers({

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })
            });
            const result = await response.json();
            setPassword(result.user_password);
            setUser(result);
            const preselectedRoles = result.roles.map((role) => role.id);
            console.log("Esto tiene preselectedRoles", preselectedRoles)
            setRole_id(preselectedRoles);

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    const handleRowClick = async (id) => {
        try {
          await mostrar(id); // Obtener detalles de la empresa
          handleShow(); // Abrir el modal después de obtener los detalles
        } catch (error) {
          console.error('Error fetching company details:', error);
        }
      };

    /*CAMBIAR PASSWORD DE USUARIO*/
    let cambiarPass = async (e) => {
        e.preventDefault();
        console.log(idModal)
        console.log("password nuevo" + user_password)
        console.log(`Form submitted, ${user_password}`);

        try {
            const res = await fetch(`http://10.2.1.174:35789/admin/users/password-change/${idModal}`, {
                method: 'PUT',
                headers: new Headers({

                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }),
                body: JSON.stringify({
                    user_id: idModal,
                    user_password: user_password,
                    remember_password: user_password
            

                })
            })

            let resJson = await res.json();
            console.log(resJson)
            if (res.status === 200) {
                console.log("logro put ");
            
                setPassword(res.user_password);
            
                setMessage("bien");
            } else {

                setMessage("Ocurrio un error");
            }
        } catch (err) {
            console.log(err);
        }
    };


    /*CHECKBOX SELECCIONADO */
    const handleChecked = (id) => {
        console.log("Esto tiene role_id", role_id)
        const currentIndex = role_id.indexOf(value);
        const ro = [...role_id];
        if (currentIndex === -1) {
            ro.push(id);
        } else {
            ro.splice(index, 1);
        }
        setRole_id(ro);
        console.log(role_id)

    }


    /*ASIGNAR ROLES A USUARIOS*/
    let crearRol_usuario = async (e) => {
        e.preventDefault();
        console.log(role_id)

        let res = await fetch(`http://10.2.1.174:35789/admin/users/update/${idModal}`, {
            method: 'PUT',
            headers: new Headers({

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }),
            body: JSON.stringify({
                name: name,
                username: username,
                email: email,
                avatar: null,
                id_company: id_company,
                roles: role_id


            }),
        });
        console.log({ id_company, name, username, email, role_id })

        let resJson = await res.json();
        if (res.status === 200) {
            setName(res.name);
            setUsername(res.username);
            setEmail(res.email);
            setIdCompany(res.id_company);

        }

    }

    const handleFilterChange = e => {
        setFilterValue(e.target.value);
    };


    return (

        <DashboardLayout>

            <Container fluid >
                <br></br>
                <Card >
                    <Card.Body>
                        <h3>Usuarios </h3>

                        <Row >
                            <Col xs={5} md={3}>
                                <Form >
                                    <Form.Control type="search" placeholder="Search" />

                                </Form>
                            </Col></Row>
                        <br></br>
                        <Row>
                            <Col >
                                <Table responsive >
                                    <thead>
                                        <tr>
                                            <th> <h5 >ID</h5></th>
                                            <th> <h5 style={{ fontWeight: "900" }}>Usuario</h5></th>
                                            <th> <h5 style={{ fontWeight: "900" }}>Nombre</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Apellido</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Correo</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Roles</h5></th>
                                            <th><h5 style={{ fontWeight: "900" }}>Creado en</h5> </th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {gets.length != null && (
                                        <tbody>
                                            {gets?.map(get => (
                                                <tr key={get.id}>
                                                    <td  >{get.id}</td>
                                                    <td style={{ color: "#2196f3" }}>{get.username} </td>
                                                    <td>{get.name}</td>
                                                    <td>{get.username}</td>
                                                    <td>{get.email}</td>
                                                    <td>   {get.roles.map((ro, index) => (<Badge key={index} bg="success">{ro.name}</Badge>))} </td>
                                                    <td>{dateFormat(get.created_at, "mmmm d, yyyy ")}</td>
                                                    <td> <Button style={{ backgroundColor: "#03386a" }} onClick={() => { setModalid(get.id); handleRowClick(get.id); setName(get.name); setUsername(get.username); setEmail(get.email); setIdCompany(get.id_company);}}>Agregar Rol</Button></td>
                                                    <td><a onClick={() => { handleShow1(); mostrar(get.id); setUser([]); setMessage([]); setModalid(get.id); setName(get.name); setUsername(get.username); setEmail(get.email); setIdCompany(get.id_company); setPassword('') }}> <LockIcon /> </a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </Table>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            {/*        MODAL ASIGNAR ROL */}
            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <br></br>
                    <Col sm={5} >
                        <Modal.Title > <h5 style={{ fontWeight: "700" }} > ASIGNAR ROL</h5>
                        </Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={crearRol_usuario}>
                        <Container>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" as={Row} >
                                        <Form.Label style={{ fontWeight: "900" }} sm={5}>Nombre</Form.Label>
                                        <Col sm="8">
                                            <Form.Control readOnly defaultValue={usu.name} />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col sm={6} >
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label style={{ fontWeight: "900" }} sm={5}>Apellido</Form.Label>
                                        <Col sm="8">
                                            <Form.Control readOnly defaultValue={usu.username} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <Form.Label style={{ fontWeight: "900" }} sm={4}>Roles</Form.Label>
                                    {rol.map((item, index) => (
                                        <div key={index} className="mb-3">
                                            <Form.Check  type='checkbox' >
                                            <Form.Check.Input tabIndex={-1} defaultChecked={role_id.indexOf(item.id) !== -1} onClick={() => handleChecked(item.id)} type='checkbox' />
                                                {/* <Form.Check.Input tabIndex={-1} defaultChecked={role_id.indexOf(index) !== -1} onClick={() => handleChecked(item.id)} type='checkbox' /> */}
                                                <Form.Check.Label>{item.name}</Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                    ))}

                                </Col>
                            </Row>


                            <Row className="justify-content-md-end">
                                <Col sm={6}>
                                    <Button size="lg" type="submit" style={{ width: "12em", backgroundColor: "#f6a700", borderColor: "#f6a700", borderRadius: "30px" }} >Guardar</Button>
                                    <div >{message ? <p>{message}</p> : null}</div>
                                </Col>
                            </Row>
                        </Container>
                    </Form>

                </Modal.Body>

            </Modal>


            {/* MODAL CAMBIAR CONTRASEÑA */}
            <Modal size="md" show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <br></br>
                    <Col sm={5} >
                        <Modal.Title > <h5 style={{ fontWeight: "700" }}> CAMBIAR CONTRASEÑA</h5>
                        </Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={cambiarPass}>
                        <Container>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" as={Row} >
                                        <Form.Label style={{ fontWeight: "900" }} sm={5}>Nombre</Form.Label>

                                        <Col sm="8">
                                            <Form.Control readOnly defaultValue={usu.name} />
                                        </Col>

                                    </Form.Group>
                                </Col>

                                <Col sm={6}>
                                    <Form.Group className="mb-3" as={Row} >
                                        <Form.Label style={{ fontWeight: "900" }} sm={10}>Apellido</Form.Label>

                                        <Col sm="8">
                                            <Form.Control readOnly defaultValue={usu.username} />

                                        </Col>

                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" as={Row} >
                                        <Form.Label style={{ fontWeight: "900" }} sm={5}>Usuario</Form.Label>
                                        <Col sm="12">
                                            <Form.Control readOnly defaultValue={usu.username} />
                                        </Col>
                                    </Form.Group>

                                </Col>

                                <Col sm={6}>
                                    <Form.Group as={Row} controlId="formGridEmail" htmlFor="mb-3">
                                        <Form.Label style={{ fontWeight: "900" }} sm={10}>Correo</Form.Label>

                                        <Col sm="12">
                                            <Form.Control readOnly defaultValue={usu.email} />
                                        </Col>
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row>
                                <Col sm={12}>
                                    <Form.Group className="mb-3" as={Row} >
                                        <Form.Label style={{ fontWeight: "900" }} sm={10}>Nueva contraseña</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="password" defaultValue={user_password} onChange={(e) => setPassword(e.target.value)} />
                                            <Form.Text id="passwordHelpBlock" muted>
                                                Su contraseña debe tener de 8-20 caracteres, contener letras y números,
                                                y no contener espacios, caracteres especiales o emojis.
                                            </Form.Text>

                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br></br>

                            <Row className="justify-content-md-center">
                                <Col sm={6}>
                                    <Button size="lg" type="submit" style={{ width: "15rem", backgroundColor: "#f6a700", borderColor: "#f6a700", borderRadius: "30px" }} >Guardar</Button>
                                    <div >{message ? <p>{message}</p> : null}</div>
                                </Col>
                            </Row>
                        </Container>

                    </Form>
                </Modal.Body>
            </Modal>
        </DashboardLayout>


    );
};





export default Usuarios;
