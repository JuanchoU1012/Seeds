import React from 'react';
import { NavLink } from 'react-router-dom';
import '../estilos/piePagina.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Logo from '../imagenes/Logo.png'




const PiePagina = () => {
  return (
    <div className="piePagina">
      <div className="piePaginaContenedor">
        <div className="contactosFooter">
          {/* <img src={Logo} alt="" className='logoFooter'/> */}
          <p className='iconosContactos'>
            <FontAwesomeIcon icon={faPhone} style={{color: "#3e123e",}} className='iconosFooter' />
            <span> 123456789 </span>
          </p>
          <p className='iconosContactos'>
            <FontAwesomeIcon icon={faEnvelope}style={{color: "#3e123e",}} className='iconosFooter' />          
            <span> ejemplo@correo.com </span>
          </p>
          <p className='iconosContactos'>
          <FontAwesomeIcon icon={faLocationDot} style={{color: "#3e123e",}} className='iconosFooter'/> 
          <span> Calle 123, Ciudad </span>
          </p>
        </div>
        <div className="enlacesFooter">
          <h2 className='contactanosFooter'>Enlaces</h2>
            <NavLink className='linkFooter' to='/inicioSesion'>Inicio de sesion</NavLink>

            <NavLink className='linkFooter' to='/registro'>Registro</NavLink>
        </div>
        <form action="" className='formularioFooter'>
          <h2 className='contactanosFooter'>Contactanos</h2>
          <input className='inputFooter' type="text" placeholder="Nombre" />
          <input className='inputFooter' type="email" placeholder="Correo electrónico" /><br /><br />
          <textarea name="" id="" className='mensajeFooter' placeholder='Mensaje ...'></textarea><br /><br />
          <button className='botonFooter' type="submit">Enviar</button>
          <p className='grcaiasMensaje'> ¡Gracias por el mensaje!</p>

        </form>
      </div>
    <footer className="footer">
      <p>&copy; 2024  Todos los derechos reservados.</p>
      <div className="social-icons">
        <a  target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
        <a target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
        <a target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
      </div>
    </footer>
    </div>
  );
};

export default PiePagina;