import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../estilos/ImageSlider.css"

const API = import.meta.env.VITE_REACT_APP_API;
const ImageSlider = () => {
    const [data, setData] = useState([]);
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
      <Swiper spaceBetween={0} loop={true} onAutoplay={true}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="content">
              <img src={`${API}/${item.Ruta}`} alt={item.title} />
              <div className="text-content">
                <h3>{item.NombreComun}</h3>
                <p className="card-price">${item.PrecioDeVenta} X {item.Unidad}</p>
                <button className="btn">Read more</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImageSlider;
