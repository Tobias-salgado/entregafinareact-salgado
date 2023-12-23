import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

const ItemDetail = ({ id, name, price, stock, img }) => {
    const [quantityAdded, setQuantityAdded] = useState(0)

    const { addItem } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity)

        const item = {
            id, name, price
        }

        addItem(item, quantity)
    }

    return (
        <div className="ContainerDiv">
            <article className="CardItem">
                <header className="Header">
                    <h2 className="ItemHeader">
                        {name}
                    </h2>
                </header>
                <picture>
                    <img src={`/images/${img}`} alt={name} className="ItemImg" />
                </picture>
                <section>
                    <p className="Info">
                        precio: ${price}
                    </p>
                    <p className="Info">
                        stock disponible: {stock}
                    </p>
                </section>
                <footer>
                    {
                        quantityAdded > 0 ? (
                            <Link to='/cart' className='Option'>Terminar compra</Link>
                        ) : (
                            <ItemCount initial={1} stock={stock} onAdd={handleOnAdd}/>
                        )
                    }
                </footer>
            </article>
        </div>

    )
}

export default ItemDetail