import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

import { Inicio }  from './rutas/Inicio'
import { InicioSesion } from './rutas/inicioSesion'
import  RegistrarInfo  from './rutas/vendedor/registrarInfo'

import { Registro } from './rutas/registro'
import { InicioTienda } from './rutas/InicioTienda'
import { Cartilla } from './rutas/cartilla'
import { Historias } from './rutas/historias'

import { UsuariosAdmin } from './rutas/admin/usuariosAdmin'
import { RecetasAdmin }  from './rutas/admin/recetasAdmin'
import { SemillasAdmin } from './rutas/admin/semillasAdmin'
import { ProductosRecetasAdmin } from './rutas/admin/productosrecetasAdmin'

import {MisSemillasVendedor}  from './rutas/vendedor/MisSemillas'
import {RecetasVendedor} from './rutas/vendedor/recetasVendedor'
import ProductosVendedor from './rutas/vendedor/productosVendedor'



function App() {
  return (

    <Router>
      <Routes>

        {/* Public Paths */}
        <Route path="/" element={<Inicio/>} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='/infovendedor' element={<RegistrarInfo />}/>
        <Route path='/cartilla' element={<Cartilla />}/>
        <Route path="/InicioTienda" element={<InicioTienda />} />
        <Route path="/historias" element={<Historias />} />
        

        {/* Admin Paths */}
        <Route path="/recetasAdmin" element={<RecetasAdmin />} />
        <Route path="/usuariosAdmin" element={<UsuariosAdmin />} />
        <Route path="/productosAdmin" element={<ProductosRecetasAdmin />} />
        <Route path='/semillasAdmin' element= {<SemillasAdmin/>}/>
        
        {/* Vendedor Paths */}
        <Route path="/recetasVendedor" element={<RecetasVendedor />} />
        <Route path="/misSemillasVendedor" element={<MisSemillasVendedor />} />
        <Route path="/productosVendedor" element={<ProductosVendedor />} />

        
      </Routes>
    </Router>
  )
}

export default App
