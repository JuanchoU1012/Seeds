import '../estilos/inicioSesion.css';
import logo from '../imagenes/logo.png';
import { Link, useNavigate } from 'react-router-dom';


import { useState } from "react";


const API = import.meta.env.VITE_REACT_APP_API

export const InicioSesion = () => {
  
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
        email: "",
        password: "",
    })

  const [errorMessage, setErrorMessage] = useState('');

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
                  navigate('/inicioadmin')
                }
                else if (data.rol === 1) {
                    navigate('/')
                } 
                else if (data.rol === 2) {
                    navigate('/iniciovendedor')
                } 
                else {
                  alert('No se pudo iniciar sesión')
                  console.log(data.rol)
                }
            } else {
              setErrorMessage(data.message || 'Error al iniciar sesión');
              alert("Invalid Credentials")
            }
        } catch (error) {
          setErrorMessage('Error de red. Intenta nuevamente más tarde.');
            console.error(error)
        }
    }
    return (
      <div className="contenedor">
          <div className="contenedorFormulario">
              <form className="formularioInicio" onSubmit={handleSubmit}>
                  <h2 className="tituloInicio">INICIO DE SESION</h2>
                  <br /><br />
                  <div className="inputs">
                      <input
                          type="email"
                          placeholder="Correo electrónico"
                          className="inputInicio"
                          name="email"
                          onChange={handleChange}
                      />
                      <br />
                      
                      <input
                          type="password"
                          placeholder="Contraseña"
                          className="inputInicio"
                          name="password"
                          onChange={handleChange}
                      />
                      
                      <br/>
                      <br/>
                  </div>
                  {errorMessage && <p className="error">{errorMessage}</p>}
                  <div className="contenedorBonotesInicioSesion">
                      <Link to="/" className="botonVolverinicio">
                          <button type="button" className="botones botonVolverInicio">Volver</button>
                      </Link>
                      <button type="submit" className="botones botoneInicio">Iniciar Sesión</button>
                      <br />
                  </div>
              </form>
              <div className="imagen">
                  <img src={logo} alt="Logo de mi aplicación" />
                  <br />
                  <Link to="/registro" className="cuenta">¿No tienes cuenta? Regístrate</Link>
                  <Link to="/recuperacioClave" className="cuenta cuentaRecuperacion">¿Olvidaste tu contraseña?</Link>
              </div>
          </div>
      </div>
  );
}