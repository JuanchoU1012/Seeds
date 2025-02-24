import React from "react"
import Nav from '../components/navegacion'

import '../estilos/historias.css'

const farmers = [
    {
      name: "",
      image: "https://static.wixstatic.com/media/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg/v1/fill/w_558,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg",
      story: "Babaco"
    },
    {
      name: "",
      image: "https://www.shutterstock.com/image-photo/arabicas-coffee-beans-ripening-on-600nw-2314354739.jpg",
      story: "Cafe taturro"
    },
    {
      name: "",
      image: "https://ecohuertalostamayos.com/wp-content/uploads/2022/08/propiedades-ajo.jpg",
      story: "Ajo morado"
    },
    {
      name: "",
      image: "https://static.wixstatic.com/media/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg/v1/fill/w_558,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg",
      story: "Babaco"
    },
    {
      name: "",
      image: "https://www.shutterstock.com/image-photo/arabicas-coffee-beans-ripening-on-600nw-2314354739.jpg",
      story: "Cafe taturro"
    },
    {
      name: "",
      image: "https://ecohuertalostamayos.com/wp-content/uploads/2022/08/propiedades-ajo.jpg",
      story: "Ajo morado"
    },

    {
      name: "",
      image: "https://static.wixstatic.com/media/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg/v1/fill/w_558,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg",
      story: "Babaco"
    },
    {
      name: "",
      image: "https://www.shutterstock.com/image-photo/arabicas-coffee-beans-ripening-on-600nw-2314354739.jpg",
      story: "Cafe taturro"
    },
    {
      name: "",
      image: "https://ecohuertalostamayos.com/wp-content/uploads/2022/08/propiedades-ajo.jpg",
      story: "Ajo morado"
    },
  ];
  

export const Historias = () =>{
    return(
        <div className="conatinerHistorias">
            <Nav/>
                <h1 className="titulo-historias">Historias caminantes</h1>
            <div className="gallery-container">
      {farmers.map((farmer, index) => (
        <div key={index} className="card">
          <img src={farmer.image} alt={farmer.name} className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{farmer.name}</h3>
            <p className="card-text">{farmer.story}</p>
            <button className="card-button">Leer más</button>
          </div>
        </div>
      ))}
    </div>
    
        </div>
    )
}