import { Meal } from '../../types/meal';
import Button from '../UI/button/Button';
import Modal from '../UI/modal/Modal';
import styles from './Cart.module.css';

type Props = {
    onClose: () => void
    onOrder: () => void
}

const Cart = ({ onClose, onOrder } : Props) => {
    const cartItems: Meal[] = [ {id: 'm1', name: 'Sushi', description: 'Finest fish and veggies', price: 22.99} ]
    const cartItemsDisplay = (
        <ul className={styles.cart_items}>
            {
                cartItems.map(item => {
                    return (
                        <li key={item.id}>
                            {item.name}
                        </li>
                    )
                })
            }
        </ul>
    );

    return(
        <Modal>
            { cartItemsDisplay }
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>35.99</span>
            </div>
            <div className={styles.actions}>
                <Button btnAlt={true} onClick={onClose}>Close</Button>
                <Button disabled={cartItems.length === 0} onClick={onOrder}>Order</Button>
            </div>
        </Modal>
    )
}

export default Cart;