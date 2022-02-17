import { useContext, useEffect, useState } from "react";
import CartIcon from "../../UI/icons/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart-context";

type Props = {
  onClick: () => void
}

const HeaderCartButton = ({ onClick } : Props) => {
  const [ btnIsHighlighted, setBtnIsHighlightd ] = useState(false);
  const cartCtx = useContext(CartContext);
  const numOfItems = cartCtx.items.reduce((acc, curr) => acc + (curr.amount as number), 0);

  const btnClasses = `${classes.button} ${ btnIsHighlighted ? classes.bump : ''}`;

  const { items } = cartCtx;

  useEffect(() => {
    if(items.length === 0) return;
    setBtnIsHighlightd(true);

    const timer = setTimeout(() => {
      setBtnIsHighlightd(false);
    }, 300)

    return () => clearTimeout(timer);
    
  }, [items])

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{ numOfItems }</span>
    </button>
  );
};

export default HeaderCartButton;
