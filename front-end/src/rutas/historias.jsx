import React from "react"
import Nav from '../components/navegacion'
import { useEffect, useState } from "react";

import '../estilos/historias.css'

// const farmers = [
//     {
//       name: "",
//       image: "https://static.wixstatic.com/media/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg/v1/fill/w_558,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg",
//       story: "Babaco"
//     },
//     {
//       name: "",
//       image: "https://www.shutterstock.com/image-photo/arabicas-coffee-beans-ripening-on-600nw-2314354739.jpg",
//       story: "Cafe taturro"
//     },
//     {
//       name: "",
//       image: "https://ecohuertalostamayos.com/wp-content/uploads/2022/08/propiedades-ajo.jpg",
//       story: "Ajo morado"
//     },
//     {
//       name: "",
//       image: "https://static.wixstatic.com/media/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg/v1/fill/w_558,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg",
//       story: "Babaco"
//     },
//     {
//       name: "",
//       image: "https://www.shutterstock.com/image-photo/arabicas-coffee-beans-ripening-on-600nw-2314354739.jpg",
//       story: "Cafe taturro"
//     },
//     {
//       name: "",
//       image: "https://ecohuertalostamayos.com/wp-content/uploads/2022/08/propiedades-ajo.jpg",
//       story: "Ajo morado"
//     },

//     {
//       name: "",
//       image: "https://static.wixstatic.com/media/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg/v1/fill/w_558,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9a9beb_8b2684a7e1514e96ae4423bb928f4261~mv2.jpg",
//       story: "Babaco"
//     },
//     {
//       name: "",
//       image: "https://www.shutterstock.com/image-photo/arabicas-coffee-beans-ripening-on-600nw-2314354739.jpg",
//       story: "Cafe taturro"
//     },
//     {
//       name: "",
//       image: "https://ecohuertalostamayos.com/wp-content/uploads/2022/08/propiedades-ajo.jpg",
//       story: "Ajo morado"
//     },
//   ];

const API = import.meta.env.VITE_REACT_APP_API;
export const Historias = () => {

const [seeds, setSeeds] = useState([]);
const [filteredSemillas, setFilteredSemillas] = useState([])
const [searchTerm, setSearchTerm] = useState("")

useEffect(() => {
  const fecthdata = async () => {
    try {
      const response = await fetch(`${API}/semillas/get`, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      })
      if (response.status === 200) {
        const data = await response.json()
        setSeeds(data)
        setFilteredSemillas(data)
      }
      else{
        const data = await response.json()
        console.error("Failed to fetch data", data)
        setSearchTerm(data.message || "Error al obtener datos de semillas.")
      }
    }
    catch (error) {
      console.log("Error fecthing seed data:", error)
    } 
  }
  fecthdata()
}, [])


  return (
    <div className="containerHistorias">
      <Nav />
      <h1 className="titulo-historias">Nuestras Semillas y Sus Historias</h1>
      <div className="gallery-containerh">
        {seeds.map((seed, index) => (
          <div key={index} className="card">
            <img src={seed.Ruta} alt={seed.NombreComun} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{seed.NombreComun}</h3>
              <p className="card-text">{seed.NombreCientSemilla}</p>
              <p className="card-text">{seed.Descripcion}</p>
              {/* <button className="card-button">Leer más</button> */}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}