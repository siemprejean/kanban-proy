'use client'
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import 'styles/theme/components/_login.scss';
import { postLogin } from "@/app/data/api";
import { useRouter } from "next/router";



const Formulario = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
    const enviar = async (data) => {
        const body = {
            email: data.usuario,
            user_password: data.contraseña
        }
        console.log(data)

        const resp = await postLogin(body);
        console.log("Esto tiene resp ", resp.data.token)
        if (resp.data.token !== null) {
            // Almacena el token en localStorage
            localStorage.setItem('token', resp.data.token);

            // Redirige al usuario a la página principal
            window.location.href = '/';
        }
    }

    return <div style={{ backgroundImage: `url(${"../images/Screenshot_2.jpg"})`, backgroundSize: "cover", height: "100vh" }}>
        <div style={{ paddingTop: "100px" }}>
            <Card style={{ width: '25rem', height: '25rem', margin: 'auto', borderRadius: "20px" }} className="smooth-shadow-md">
                <Card.Body >
                    <Image src="/images/logos/TEMIS - ATENEA LOGO_Temis solo.png" style={{ width: "250px" }} className="rounded mx-auto d-block mb-6"></Image>
                    <Card.Title style={{ fontSize: "x-large", color: "black", fontWeight: "800", textAlign: "center", font: "inter", fontWeight: "800" }} >Inicio de Sesión</Card.Title>
                    <form onSubmit={handleSubmit(enviar)}
                    >

                        <div>

                            <input className="mb-4" style={{ borderRadius: "8px", borderColor: "#4791db", borderWidth: "2px", marginLeft: "2rem", padding: "10px 50px" }} type="email"  {...register('usuario', { required: true, maxLength: 20, })} placeholder="Usuario" />
                            {errors.usuario?.type === 'required' && <p>Ingrese su usuario</p>}
                            {errors.usuario?.type === 'maxLenght' && <p>Recuerde que son solo 8 caracteres</p>}
                        </div>
                        <div>

                            <input className="mb-4" style={{ borderRadius: "8px", borderColor: "#4791db", borderWidth: "2px", marginLeft: "2rem", padding: "10px 50px" }} type="password"  {...register('contraseña', { required: true, maxLenght: 20, })} placeholder="Contraseña" />
                            {errors.contraseña?.type === 'required' && <p>Ingrese su password</p>}
                            {errors.contr?.type === 'maxLength' && <p>Recuerde que son solo 8 caracteres</p>}
                        </div>
                        <button className="loginbutton" disabled={isSubmitting} style={{ borderRadius: "10px", backgroundColor: "#03386a", color: "white", marginLeft: "2rem", padding: "10px 85px", }} type="submit">{isSubmitting ? "Cargando..." : "INICIAR SESIÓN"}</button>

                    </form>

                </Card.Body>
            </Card>
        </div>
    </div>
}

export default Formulario;