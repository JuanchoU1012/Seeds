import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Importa el módulo de autoplay
import "swiper/css";
import "../estilos/ImageSlider.css"

import VermasTienda from "./vermasTienda";

const API = import.meta.env.VITE_REACT_APP_API;
const ImageSlider = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlevermas = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  }

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${API}/tienda`, {
          method: 'GET',
          headers: {
            "Accept": "application/json"
          }
        })

        const data = await response.json();
        if (response.ok && data.length > 0) {
          setData(data);
        }
      }
      catch (error) {
        console.error("Error fetching seed data:", error);
      }
    }
    fetchOptions();
  }, []);

  return (
    <section className="collection">
      <Swiper
        spaceBetween={19}
        slidesPerView={3}
        loop={true}
        modules={[Autoplay]} // Agregar autoplay como módulo
        autoplay={{ 
          delay: 3000,
          disableOnInteraction: false 
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="content">
              <img src={`${item.Ruta}`} alt={item.title} />
              <div className="text-content">
                <h3>{item.NombreComun}</h3>
                <p className="card-price">${item.PrecioDeVenta} X {item.Unidad}</p>
                <button className="btn-ver" onClick={() => handlevermas(item)}>Ver Mas</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <VermasTienda
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedItem}
      />
    </section>
  );
};

export default ImageSlider;
