import React from "react"
import CartillaPdf from '../documentos/cartilla.pdf'
import Nav from '../components/navegacion'
import '../estilos/cartilla.css'


export const Cartilla = () =>{
    return(
        <div className="container-cartilla">
            <Nav/>
            <div className="cartilla">
                <iframe src={CartillaPdf} width="90%" height="600" className="mt-8"/>
            </div>
        </div>
    )
}

