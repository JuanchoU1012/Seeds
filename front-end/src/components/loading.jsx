import Loa from '../imagenes/mamian.png'
import '../estilos/401.css'

export const Loading = () =>{
    return(
        <div className="contenedorLoading">
            <img src={Loa} alt="" />
        </div>
    )
}