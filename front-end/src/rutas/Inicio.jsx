import React from "react";
import '../estilos/inicioPagina.css';
import Nav from '../components/navegacion'
import logo from '../imagenes/logo.png'
import PiePagina from '../components/piePagina'
import Vision from '../imagenes/vision.png'

export const Inicio = () => {
  return (
    <div className="principio">
      <Nav/>
      <div className="imagenInicio">
        <img
          src="https://i.pinimg.com/736x/8b/3b/29/8b3b29ef215f312f30dcf915b933a57e.jpg"
          alt="Mi imagen" className="imagenSuperior"
        />
          <div className="cuadritoTexto">
              <h3>Saberes y sabores</h3>
          </div>
        </div>
        <div className="primerTexto">
            <div className="textoInicio">
              <p className="parrafoInicio">
                <h1 className="quienesSomos">¿QUIENES SOMOS?</h1>
                El Proyecto Rescate de Semillas Olvidadas del Oriente Antioqueño, integra programas de Titulada, Media Técnica, SER e Inclusión y busca la apropiación comunitaria de la biodiversidad alimentaria en los 23 municipios de la Región, mediante la Producción, Transformación y Comercialización de bienes y servicios generados a partir de especies criollas y nativas.

                Este portal permitirá gestionar las acciones desarrolladas por el Proyecto Integrador de Centro, a partir de la divulgación e información en sitio web, sobre especies vegetales a rescatar, por parte de instructores, aprendices, custodios de semillas, representantes de pilotos y productos orgánicos de semillas criollas y nativas del Oriente Antioqueño Colombiano, buscando la apropiación y potenciación de saberes sobre su producción, transformación y comercialización de bienes y servicios creativos a partir de semillas campesinas olvidadas, básicas en la seguridad alimentaria y el bienestar y buen vivir de la población rural.
                </p>
          </div>

        </div>
        <div className="misionVision">
          <p className="parrafoVisionMision">
          <h1 className="tituloInicioPaginaMV tituloMision">MISIÓN</h1>
            <img src="https://www.veropreviale.com/wp-content/uploads/2023/02/mision-vision-y-valores.svg" alt="" className="imagenMision"/>
            El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país (Ley 119/1994).​</p>
          <p className="parrafoVisionMision">
          <h1 className="tituloInicioPaginaMV tituloVision">VISIÓN</h1>
            <img src={Vision} alt="" className="imagenVision"/>
          En el año 2022 el SENA se consolidará como una entidad referente de formación integral para el trabajo, por su aporte a la empleabilidad, el emprendimiento y la equidad, que atiende con pertinencia y calidad las necesidades productivas y sociales del país.</p>
        </div>
        
        <PiePagina/>
    </div>

  );
};

