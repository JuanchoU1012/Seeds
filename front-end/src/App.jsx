import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

import {Inicio} from './rutas/Inicio'
import {InicioSesion} from './rutas/inicioSesion'
import {Registro} from './rutas/registro'
import {InicioTienda} from './rutas/InicioTienda'

import {UsuariosAdmin} from './rutas/admin/usuariosAdmin'

import {InicioAdmin} from './rutas/admin/InicioAdmin'
import { SemillasAdmin } from './rutas/admin/semillasAdmin'
import {RecetasAdmin} from './rutas/admin/recetasAdmin'
import {ProductosRecetasAdmin} from './rutas/admin/productosrecetasAdmin'

import {InicioVendedor} from './rutas/vendedor/inicioVendedor'
import {MisSemillas} from './rutas/vendedor/MisSemillas'
import {RecetasVendedor} from './rutas/vendedor/recetasVendedor'
import {TiendaVendedor} from './rutas/vendedor/tiendaVendedor'

function App() {
  return (

    <Router>
      <Routes>

        {/* Public Paths */}
        <Route path="/" element={<Inicio/>} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/InicioTienda" element={<InicioTienda />} />
        

        {/* Admin Paths */}
        <Route path="/InicioAdmin" element={<InicioAdmin />} />
        <Route path="/recetasAdmin" element={<RecetasAdmin />} />
        <Route path="/usuariosAdmin" element={<UsuariosAdmin />} />
        <Route path="/productosAdmin" element={<ProductosRecetasAdmin />} />
        <Route path='/semillasAdmin' element= {<SemillasAdmin/>}/>
        
        {/* Vendedor Paths */}
        <Route path="/InicioVendedor" element={<InicioVendedor />} />
        <Route path="/RecetasVendedor" element={<RecetasVendedor />} />
        <Route path="/misSemillasVendedor" element={<MisSemillas />} />
        <Route path="/TiendaVendedor" element={<TiendaVendedor />} />

        
      </Routes>
    </Router>
  )
}

export default App
