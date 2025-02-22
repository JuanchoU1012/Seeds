import '../estilos/401.css'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const U401 = () => {
  return (
    <Fragment>
      <div className="container text-center mt-5 ">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template container401">
              <h1>Oops!</h1>
              <h2>401 No autorizado</h2>
              <div className="error-details mb-4 container401">
                <div className="img401">

                <img src="https://files.oaiusercontent.com/file-GEZ5xJYT3Rq2efP1exAh8K?se=2025-02-19T20%3A05%3A07Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De2905be0-f08d-4854-9f8e-b82a88acf0a0.webp&sig=10lfNMVjKIa0hkHFBjwHR6SGqrlmjgI7fLVPvkoyslw%3D" alt="" className='img401' />
                </div>
                No tienes permiso para acceder a esta página. 
              </div>
              <div className="error-actions">
                <Link to="/" className="volver401">
                  <span className="glyphicon glyphicon-home"></span>
                  Volver
                </Link>
                <Link to="/inicioSesion" className="volver401">
                  <span className="glyphicon glyphicon-log-in"></span>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
