import AvailableMeals from "../available-meals/AvailableMeals";
import MealsSummary from "../meals-summary/MealsSummary";
import AvailableMealsForm from "../availableMealsForm/AvailableMealsForm";

const Meals = () => {
    return(
        <>
            <MealsSummary />
            <AvailableMeals />
            <AvailableMealsForm />
        </>
    )

}

export default Meals;