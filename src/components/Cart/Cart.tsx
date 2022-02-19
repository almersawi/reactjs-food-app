import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import { Meal } from "../../types/meal";
import Checkout from "../Meals/checkOut/Checkout";
import Button from "../UI/button/Button";
import Modal from "../UI/modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

type Props = {
  onClose: () => void;
};

const Cart = ({ onClose }: Props) => {
  const cartCtx = useContext(CartContext);
  const cartItems: Meal[] = cartCtx.items;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartItems.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);

  const addItemHandeler = (item: Meal) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandeler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemsDisplay = (
    <ul className={styles.cart_items}>
      {cartItems.map((item) => {
        return (
          <li key={item.id}>
            <CartItem
              item={item}
              onAdd={() => addItemHandeler(item)}
              onRemove={() => removeItemHandeler(item.id)}
            />
          </li>
        );
      })}
    </ul>
  );

  const orderHandeler = () => {
    setIsCheckout(true);
  };

  const cartActions = (
    <div className={styles.actions}>
      <Button btnAlt={true} onClick={onClose}>
        Close
      </Button>
      {hasItems && (
        <Button disabled={cartItems.length === 0} onClick={orderHandeler}>
          Order
        </Button>
      )}
    </div>
  );

  return (
    <Modal>
      {cartCtx.items.length > 0 && (
        <>
          {cartItemsDisplay}
          {cartCtx.totalAmount && (
            <div className={styles.total}>
              <span>Total Amount</span>
              <span>{totalAmount} </span>
            </div>
          )}
        </>
      )}
      {
          cartCtx.items.length === 0 && <div className={styles.empty}>Your cart is empty</div>
      }
      {!isCheckout && cartActions}
      {isCheckout && <Checkout onClose={onClose} />}
    </Modal>
  );
};

export default Cart;
