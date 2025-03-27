import '../estilos/401.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


export const U401 = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
          <h1 className='error-title'>Oops!</h1>
          <h2 className='nonauto'>401 - No autorizado</h2>
            <div className="error-details mb-4">
              {/* <div className="error-img">
                <img
                  src="/ruta-a-tu-imagen/401.webp"
                  alt="Error 401"
                  className="img-401"
                />
              </div> */}
              <p>No tienes permiso para acceder a esta página.</p>
            </div>
            <div className="error-actions">
              <Link to="/" className="btn401">
                <FontAwesomeIcon className="icon401"  icon={faHome}/> Volver
              </Link>
              <Link to="/inicioSesion" className="btn401">
                <FontAwesomeIcon className="icon401" icon={faSignInAlt}/> Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
