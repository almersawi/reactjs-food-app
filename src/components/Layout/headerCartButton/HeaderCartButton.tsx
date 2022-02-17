import { useContext } from "react";
import CartIcon from "../../UI/icons/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart-context";

type Props = {
  onClick: () => void
}

const HeaderCartButton = ({ onClick } : Props) => {

  const cartCtx = useContext(CartContext);
  const numOfItems = cartCtx.items.reduce((acc, curr) => acc + (curr.amount as number), 0);

  console.log("Updated")

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{ numOfItems }</span>
    </button>
  );
};

export default HeaderCartButton;
