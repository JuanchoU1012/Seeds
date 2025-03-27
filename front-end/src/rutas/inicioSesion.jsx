import '../estilos/inicioSesion.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalSuccessError from '../components/ModalSuccessError';

import { useState } from "react";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const API = import.meta.env.VITE_REACT_APP_API

export const InicioSesion = () => {

    const navigate = useNavigate();
    const [FormData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [modal, setModal] = useState({
        isOpen: false,
        message: "",
        type: "",
        onconfirm: null
    })


    const handleChange = (e) => {

        const { name, value } = e.target
        setFormData({
            ...FormData,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json",
                },
                body: JSON.stringify({
                    Email: FormData.email,
                    Password: FormData.password
                })
            })

            const data = await response.json()

            if (response.ok) {

                if (data.rol === 0) {
                    setModal({
                        isOpen: true,
                        message: "Iniciando sesión",
                        type: "success"
                    })
                    navigate('/recetasadmin')
                }
                else if (data.rol === 1) {
                    setModal({
                        isOpen: true,
                        message: "Iniciando sesión",
                        type: "success"
                    })
                    navigate('/')
                }
                else if (data.rol === 2) {
                    setModal({
                        isOpen: true,
                        message: "Iniciando sesión",
                        type: "success"
                    })
                    navigate('/misSemillasVendedor')
                }
                else {
                    setModal({
                        isOpen: true,
                        message: "Revisa tus credenciales",
                        type: "error"
                    })
                }
            } else {
                setModal({
                    isOpen: true,
                    message: "Revisa tus credenciales",
                    type: "error"
                })
            }
        } catch (error) {
            console.error(error)
            setModal({
                isOpen: true,
                message: "Problemas con la conexión",
                type: "error"
            })
        }
    }
    return (
        <div className="contenedorLogin">
            <div className="contenedorImagenLogin">
                <img className="imagenLogin" src="https://media.istockphoto.com/id/1401722160/es/foto/plantaci%C3%B3n-soleada-con-cultivo-de-soja.jpg?s=612x612&w=0&k=20&c=5ZTCnfPWntup-6i6G5cAhOniow_TWNFCacAaFipnI2o=" alt="" />
                <h1 className="tituloImagenLogin">Bienvenidos a saberes y sabores</h1>
                <img className='logosena' src="src/imagenes/logoSena.png" alt="" height={140} width={140} />
            </div>
            <div className="contenedorFormulario">
                <form className="formularioInicio" onSubmit={handleSubmit}>
                    <h1 className="tituloInicio">Inicio de sesion</h1>
                    <br /><br />
                    <div className="inputs">
                        {/* <FontAwesomeIcon icon={faEnvelope} className="iconosLogin"/> */}
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="inputLogin"
                            name="email"
                            onChange={handleChange}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="inputLogin"
                            name="password"
                            onChange={handleChange}
                        />
                        <br />
                        <Link to="/">
                            <button type="button" className="botonesSesion botonVolverInicio">Volver</button>
                        </Link>

                        <button type="submit" className="botonesSesion botoneInicio">Iniciar Sesión</button>

                        <Link to="/registro" className="cuenta">¿No tienes cuenta? Regístrate</Link>
                        <br />

                    </div>
                </form>
            </div>
            <ModalSuccessError
                isOpen={modal.isOpen}
                message={modal.message}
                type={modal.type}
                onClose={() => setModal({ isOpen: false })}
            />
        </div>
    );
}