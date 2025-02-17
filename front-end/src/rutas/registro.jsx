import { useState, Fragment } from "react"
import { useNavigate } from "react-router-dom" 


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
        headers: {
          "Content-Type": "application/json",
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
    <Fragment>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-header bg-primary text-white text-center py-3">
            <h3 className="mb-0">Join Us!</h3>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              
              <div className="mb-4">
                <label className="form-label">Rol</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <select className="form-select" name="rol" onChange={handleChange} required>
                    <option value="">Selecciona tu rol</option>
                    <option value="0">Admin</option>
                    <option value="1">Usuario Comûn</option>
                    <option value="2">Vendedor</option>
                  </select> 
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
              <label>Confirma Tu Contraseña</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                className="form-control"
                value={passwordConfirm}
                onChange={(e) =>{setPasswordConfirm(e.target.value)}}
                required
              />
              </div>
            </div>

              <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
