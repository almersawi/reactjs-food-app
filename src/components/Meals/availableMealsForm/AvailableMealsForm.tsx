import Button from "../../UI/button/Button";
import classes from "./AvailableMealsForm.module.css";
import useInput from "../../../hooks/use-input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/BACKEND";

const AvailableMealsForm = () => {
  const { value: name, onChange: onNameChange } = useInput();
  const { value: description, onChange: onDescriptionChange } = useInput();
  const { value: price, onChange: onPriceChange } = useInput();
  const [loading, setLoading] = useState(false);

  const httpClient = axios.create({
    baseURL: `${BASE_URL}/meals.json`,
  });

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formVal = {
      name,
      description,
      price: parseFloat(price),
    };

    await saveMeal(formVal);
  };

  const saveMeal = async (val: any) => {
    try {
        const response = await httpClient.post("", val);
        console.log(response);
        setLoading(false);
    }
    catch(error) {
        setLoading(false);
        console.log(error);
    }
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.formBody}>
        <div className={classes.formControl}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={onNameChange} value={name} />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            onChange={onDescriptionChange}
            value={description}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            onChange={onPriceChange}
            value={price}
          />
        </div>
      </div>
      <div className={classes.formFooter}>
        <Button disabled={loading}>{loading ? 'Loading..' : 'Submit'}</Button>
      </div>
    </form>
  );
};

export default AvailableMealsForm;
