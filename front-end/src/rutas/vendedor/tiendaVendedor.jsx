import React from "react";
import Nav from '../../components/navegacionVendedor'
import MenuLateral from '../../components/sidebar'
import Galeria from '../../components/galeria'


const imagenesTienda = [
    { url: 'https://encolombia.com/wp-content/uploads/2021/10/Cultivo-de-Calabaza-330x205.jpg', titulo: 'AUYAMA' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs3A1bJmZKyXZGnpj1fWNh9JQb9JGaAbZunw&s', titulo: 'ARVEJA ' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOZZZGT3MkrCVm-YOr0kcr3HiYR1RxZHagw&s', titulo: ' AMARANTO' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAOeTFUo4uGtmE6J6gaykH4qCkYgIJ2bySXLcyNxhXifpC0LQ8yLb1i9bpbEJODccmFQ&usqp=CAU', titulo: ' ARRACACHA' },
    { url: 'https://picsum.photos/200/308', titulo: ' ' },
    { url: 'https://picsum.photos/200/309', titulo: ' ' },
    { url: 'https://picsum.photos/200/302', titulo: ' ' },
    { url: 'https://picsum.photos/200/302', titulo: ' ' },
    { url: 'https://picsum.photos/200/300', titulo: ' ' },
    { url: 'https://picsum.photos/200/301', titulo: ' ' },
    { url: 'https://picsum.photos/200/302', titulo: ' ' },
    { url: 'https://picsum.photos/200/302', titulo: ' ' },
  ];

export const TiendaVendedor = () => {
    return (
        <div className="TiendaPrincipio">
            <Nav />
            <div className="contenedorGaleria">
                <MenuLateral/>
                <Galeria imagenes={imagenesTienda} />
            </div>
        </div>
    )
}

