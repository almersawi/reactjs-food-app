import { useContext, useRef } from 'react';
import { Meal } from '../../../types/meal';
import classes from './MealItem.module.css';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import AddIcon from '../../UI/icons/AddIcon';
import CartContext from '../../../store/cart-context';

type Props = {
    meal: Meal;
}

const MealItem = ({ meal} : Props) => {

    const amountRef = useRef();
    const cartCtx = useContext(CartContext);
    
    const submitHandeler = (ev: any) => {
        ev.preventDefault();
        if(!amountRef.current) return;

        const enteredAmount = ((amountRef.current as any).value);
        if(enteredAmount.trim().length === 0 || isNaN(Number(enteredAmount))) {
            return;
        }

        const amount = Number(enteredAmount);
        
        if(amount > 0) {
            const item = { ...meal, amount };
            if(cartCtx.addItem) cartCtx.addItem(item);
        }
    }

    return (
        <div className={classes.meal}>
            <div className={classes.meal_info}>
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <p className={classes.price}>{meal.price}$</p>
            </div>
            <div className={classes.meal_actions}>

                <form onSubmit={submitHandeler}>
                    <Input ref={amountRef} label="Amount:" input={
                        {
                            type: 'number',
                            id: `${meal.id}-amount`,
                            min: 1,
                            max: 10,
                            step: 1,
                            defaultValue: 1
                        }
                    }/>
                    <Button type="submit">
                        <span className={classes.icon}> <AddIcon /> </span>
                        <span>Add</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default MealItem;