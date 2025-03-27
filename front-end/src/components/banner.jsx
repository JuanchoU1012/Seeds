import React from 'react'
import '../estilos/banner.css'
import { Link } from 'react-router-dom'
import bannerImg from '../imagenes/banner.png' 

const Banner = () => {
  return (
    <div className='container-banner'>
      <div className='banner'>
        <div className='banner-image'>
          <img src={bannerImg} alt='Banner' />
        </div>
        
        <div className='banner-section left'>
          <div className='overlay'>
            <div className='banner-content left-content'>
              <p className='banner-text'>Conoce nuestras Recetas</p>
              <Link to='/InicioRecetas'>
                <button className='banner-button-left'>Conócelas</button>
              </Link>
            </div>
          </div>
        </div>

        <div className='banner-section right'>
          <div className='overlay'>
            <div className='banner-content right-content'>
              <p className='banner-text'>Conoce nuestras semillas y sus historias</p>
              <Link to='/historias'>
                <button className='banner-button-right'>Conócelas</button>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Banner
