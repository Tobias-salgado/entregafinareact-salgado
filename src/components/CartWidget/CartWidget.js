import cart from './assets/cart.svg';
import './CartWidget.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Cartwidget = () => {
    const { totalQuantity } = useContext(CartContext)

    return (
        <Link to='/cart' className='CartWidget' style={{ display: totalQuantity > 0 ? 'block' : 'none' }}>
            <img className='CartImg' src={cart} alt='cart-widget' />
            {
                totalQuantity> 0 && <strong className='itemsIndicador'> {totalQuantity} </strong>
            }
        </Link>
    )
}

export default Cartwidget