import { Meal } from '../../types/meal';
import styles from './CartItem.module.css';

type Props = {
    item: Meal,
    onRemove: () => void,
    onAdd: () => void
}

const CartItem = ({ item, onAdd, onRemove } : Props) => {
    return (
        <li className={styles.cartItem}>
            <div>
                <h2>{ item?.name }</h2>
                <div className={styles.summary}>
                    <span className={styles.price}>${ item?.price?.toFixed(2) }</span>
                    <span className={styles.amount}>x { item?.amount ?? 0 }</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={onRemove}>-</button>
                <button onClick={onAdd}>+</button>
            </div>
        </li>
    )
}

export default CartItem;