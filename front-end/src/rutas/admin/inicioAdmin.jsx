import React from "react";
import '../../estilos/admin/inicioAdmin.css';
import NavAdmin from '../../components/navegacionAdmin'

import { useState, useEffect } from 'react'
import { getTokenInfo } from '../../../helpers/getjwt'
import { getUserInfo } from '../../../helpers/getuserinfo'
import { U401 } from '../../components/401'

export const InicioAdmin = () => {
  const [userData, setUserData] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenInfo()
      const userData = await getUserInfo()
      setUserData(userData)
      setToken(tokenData)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>
  }

  if (!userData || userData.rol !== 0) {
    return <U401 />
  }
  return (
    <div className="principioAdmin">
      <NavAdmin/>
      <div className="imagenInicioAdmin">
        <img
          src="https://www.compracampesino.com/images/noticias-2024/agosto/cultivos-resistentes-en-colombia.webp"
          alt="Mi imagen" className="imagenSuperiorAdmin"
        />
        </div>
        <h1 className="tituloPrincipalInicioAdmin">SABERES</h1>
        <h1 className="tituloPrincipalInicioAdmin">Y SABORES</h1>
        <div className="primerTexto">
        </div>
    </div>
  )
}

