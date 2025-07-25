'use client'
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {Loading_1} from "../components/ui/loading_1"
import { Card, Image } from 'react-bootstrap';
import 'styles/theme/components/_login.scss';
import { postLogin } from "@/app/data/api";
import  ErrorMessagex from "../components/ui/ErrorMessage";

const Formulario = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setisError] = useState(false)
    const [mensaje, setMensa] = useState("")
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
    const enviar = async (data) => {
        setisError(false);
        setLoading(true); // Start showing loading
    
        const body = {
            email: data.usuario,
            user_password: data.contraseña
        };
    
        try {
            const resp = await postLogin(body);
    
            if (resp.data?.token) {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('token_expiration_date', resp.data.expiration_date);
    
                // Redirect — loading stays visible until page unloads
                window.location.href = '/components/home';
            } else {
                setMensa(resp.message);
                setisError(true);
                setLoading(false); // Stop loading on error
            }
        } catch (error) {
            console.error("Login error:", error);
            setMensa("Hubo un error al iniciar sesión.");
            setisError(true);
            setLoading(false); // Stop loading on error
        }
    };    

    return (

    <div style={{ backgroundImage: `url(${"../images/Screenshot_2.jpg"})`, backgroundSize: "cover", height: "100vh" }}> <div style={{ paddingTop: "100px" }}>
            <Card style={{ width: '25rem', height: '25rem', margin: 'auto', borderRadius: "20px" }} className="smooth-shadow-md">
                <Card.Body >
                    <Image src="/images/logos/TEMIS - ATENEA LOGO_Temis solo.png" alt="Temis Atenea Logo"  style={{ width: "250px" }} className="rounded mx-auto d-block mb-6"></Image>
                    <Card.Title style={{ fontSize: "x-large", color: "black", fontWeight: "800", textAlign: "center", font: "inter", fontWeight: "800" }} >Inicio de Sesión</Card.Title>
                    <form onSubmit={handleSubmit(enviar)}>

                        <div className="container">

                            <input className="mb-4" style={{ borderRadius: "8px", borderColor: "#4791db", borderWidth: "2px", padding: "10px 50px" }} type="email"  {...register('usuario', { required: true, maxLength: 40, })} placeholder="Usuario" />
                            {errors.usuario?.type === 'required' && <p>Ingrese su usuario</p>}
                            {errors.usuario?.type === 'maxLength' && <p>Recuerde que son solo 8 caracteres</p>}
                        </div>
                        <div className="container">

                            <input className="mb-4" style={{ borderRadius: "8px", borderColor: "#4791db", borderWidth: "2px", padding: "10px 50px" }} type="password"  {...register('contraseña', { required: true, maxLength: 20, })} placeholder="Contraseña" />
                            {errors.contraseña?.type === 'required' && <p>Ingrese su password</p>}
                            {errors.contraseña?.type === 'maxLength' && <p>Recuerde que son solo 8 caracteres</p>}
                        </div>
                       

                        <div className="container">
                        {isError &&  <ErrorMessagex mensaje= {mensaje} />}
                        {loading ? (<Loading_1 />) : (<button className="loginbutton" disabled={loading} style={{ borderRadius: "10px", backgroundColor: "#03386a", color: "white", padding: "10px 85px" }} type="submit">INICIAR SESIÓN</button>)}
                        </div>

                    </form>

                </Card.Body>
            </Card>
        </div>
    </div>
    ) 
}

export default Formulario;