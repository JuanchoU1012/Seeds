import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import '../estilos/registro.css'


const API = import.meta.env.VITE_REACT_APP_API || 'http://localhost:5000'

export const Registro = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rol: ""
  })

  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== passwordConfirm) {
      setError("Passwords do not match")
      console.log(error)
      return
    }

    try {
      const response = await fetch(`${API}/registro`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rol: formData.rol
        }),
      })

      if (response.status === 201) {
        alert(response.text)
        setFormData({ email: "", password: "" })
        setPasswordConfirm("")
        navigate('/login')

      } else {
        const errorData = await response.json()
        setError(errorData.message || "Registration failed")
      }
    } catch (err) {
      setError(err.message || "An error occurred")
      console.error(err)
    }
  }
  return (
    <div className="contenedorRegistro">

      <div className="imagenRegistro">
        <img className="imagenR" src="https://www.earthshare.org/wp-content/uploads/EarthShare-8-Nonprofits-Fighting-for-Sustainable-Agriculture.jpg" alt="" />
        <h1 className="tituloImagenRegistro">Registrate a saberes y sabores</h1>
      </div>
      <form onSubmit={handleSubmit} className="formularioRegistro">
        <div className="inputsRegistro">
          <h1>Registro</h1>

          {/* <span className="input-group-text">
            <i className="bi bi-envelope"></i>
          </span> */}
          <input
            type="email"
            className="inputRegistro w-80"
            placeholder="Ingresa tu email"
            name="email"
            onChange={handleChange}
            required
          />
          

          {/* <span className="input-group-text">
            <i className="bi bi-person-fill"></i>
          </span> */}
          <select className="selectRegistro" name="rol" onChange={handleChange} required>
            <option value="">Selecciona tu rol</option>
            <option value="0">Admin</option>
            <option value="1">Usuario Comûn</option>
            <option value="2">Vendedor</option>
          </select>

          
          {/* <span className="input-group-text">
            <i className="bi bi-lock"></i>
          </span> */}
          <div className="claves">

          <input
            type="password"
            className="inputRegistro2"
            placeholder="Ingresa tu contraseña"
            name="password"
            onChange={handleChange}
            required
            />
          

          {/* <span className="input-group-text">
            <i className="bi bi-lock"></i>
            </span> */}
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            className="inputRegistro2"
            value={passwordConfirm}
            onChange={(e) => { setPasswordConfirm(e.target.value) }}
            required
            />
            </div>

          <div className="botonesRegistro">
            <Link to="/" className="botonVolverinicio">
              <button type="button" className="botonRegistro botonVolverInicioR">Volver</button>
            </Link>
            <button type="submit" className="botonRegistro">Crear cuenta</button>
          </div>
          <Link to="/iniciosesion" className="cuentaRegistro">¿ya tienes cuenta? Ingresa</Link>
        </div>
      </form>
    </div>
  )
}
