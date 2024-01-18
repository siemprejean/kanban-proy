'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';


// import hooks
import useMounted from 'hooks/useMounted';

const SignIn = () => {
    const hasMounted = useMounted();
    return (


        <Row className=" align-items-center justify-content-center g-0 min-vh-100 " style={{ backgroundImage: `url(${"./images/Screenshot_2.jpg"})`, backgroundSize: "cover" }}>
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                {/* Card */}
                <Card style={{ borderRadius: "25px" }} className="smooth-shadow-md">
                    {/* Card body */}
                    <Card.Body className="p-6">
                        <div className="mb-4 rounded mx-auto d-block">
                            <Link href="/"><Image src="/images/logos/TEMIS - ATENEA LOGO_Temis solo.png" style={{ width: "300px" }} class="rounded mx-auto d-block" className="mb-2" alt="" /></Link>
                            <p style={{ fontSize: "x-large", color: "black", fontWeight: "bold" }} class="text-center" >Inicio de Sesión</p>
                        </div>
                        {/* Form */}
                        {hasMounted &&
                            <Form>
                                {/* Username */}
                                <Form.Group className="mb-3" controlId="username">

                                    <Form.Control style={{ borderRadius: "10px", borderColor: "#4791db", borderWidth: "2px" }} type="email" name="username" placeholder="Usuario" required="" />
                                </Form.Group>

                                {/* Password */}
                                <Form.Group className="mb-3" controlId="password">

                                    <Form.Control style={{ borderRadius: "10px", borderColor: "#4791db", borderWidth: "2px" }} type="password" name="password" placeholder="Contraseña" required="" />
                                </Form.Group>

                                <div>
                                    {/* Button */}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" style={{ borderRadius: "10px", backgroundColor: "#03386a" }}>INICIAR SESIÓN</Button>
                                    </div>

                                </div>
                            </Form>}


                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


export default SignIn