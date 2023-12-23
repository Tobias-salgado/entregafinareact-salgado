import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
    const { cart, clearCart, totalQuantity, total} = useContext(CartContext)

    if(totalQuantity === 0) {
        return (
            <div>
                <h1>No hay items en el carrito</h1>
                <Link to='/' className='Option'>Productos</Link>
            </div>
        )
    }

    return (
        <div>
            {cart.map((p) => <CartItem key={p.id} {...p}/>) }
            <h3>Total: ${total}</h3>
            <button onClick={() => clearCart()} className="Option">Limpiar carrito</button>
            <Link to='/checkout' className= "Option">Finalizar Compra</Link>
        </div>
    )
}

export default Cart