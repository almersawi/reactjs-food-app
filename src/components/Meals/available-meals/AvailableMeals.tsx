import classes from './AvailableMeals.module.css';
import MealItem from '../meal-item/MealItem';
import useMeals from '../../../hooks/use-meals';
import Spinner from '../../UI/spinner/Spinner';

const AvailableMeals = () => {
  const { meals, loading } = useMeals();
  const mealsList = meals?.map((meal) => {
    return <li key={meal.id}>
      <MealItem meal={meal}/>
    </li>;
  });

  return (
    <section className={classes.meals}>
      {
        loading ? <Spinner /> :
        <ul>{mealsList}</ul>
      }
    </section>
  );
};

export default AvailableMeals;
