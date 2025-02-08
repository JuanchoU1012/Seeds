import React from "react";
import '../../estilos/inicioVendedor.css';
import NavVendedor from '../../components/navegacionVendedor'
import { getUserInfo } from '../../../helpers/getuserinfo'
import { getTokenInfo } from '../../../helpers/getjwt'
import { useState, useEffect } from 'react';
import { U401 } from "../../components/401";
export const InicioVendedor = () => {
  const [userData, setUserData] = useState(null)
        const [token, setToken] = useState(null)
        const [isLoading, setIsLoading] = useState(true)
      
        useEffect(() => {
          const fetchData = async () => {
            const UserData = await getUserInfo()
            const Token = await getTokenInfo()
            setUserData(UserData)
            setToken(Token)
            setIsLoading(false)
          }
          fetchData()
        }, [])

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>
  }

  if (!userData || userData.rol !== 2) {
    return <U401 />
  }

  return (
    <div className="principioVendedor">
      <NavVendedor/>
      <div className="imagenInicioVendedor">
        <img
          src="https://thefoodtech.com/wp-content/uploads/2024/01/produccion-de-alimentos-.jpg"
          alt="Mi imagen" className="imagenSuperiorVendedor"
        />
        </div>
        <h1 className="tituloPrincipalInicioVendedor">SABERES</h1>
        <h1 className="tituloPrincipalInicioVendedor">Y SABORES</h1>
        <div className="primerTexto">



        </div>
    </div>

  );
};

