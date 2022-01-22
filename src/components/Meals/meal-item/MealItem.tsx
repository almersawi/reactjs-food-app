import { useState } from 'react';
import { Meal } from '../../../types/meal';
import classes from './MealItem.module.css';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import AddIcon from '../../UI/icons/AddIcon';

type Props = {
    meal: Meal;
}

const MealItem = ({ meal} : Props) => {
    const [amount, setAmount] = useState(1);

    const amountChange = () => {
        
    }

    return (
        <div className={classes.meal}>
            <div className={classes.meal_info}>
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <p className={classes.price}>{meal.price}$</p>
            </div>
            <div className={classes.meal_actions}>

                <Input label="Amount:" input={
                    {
                        type: 'number',
                        id: `${meal.id}-amount`,
                        min: 1,
                        max: 10,
                        step: 1,
                        defaultValue: 1
                    }
                }/>
                <Button>
                    <span className={classes.icon}> <AddIcon /> </span>
                    <span>Add</span>
                </Button>
            </div>
        </div>
    )
}

export default MealItem;