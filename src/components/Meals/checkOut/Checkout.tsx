import Button from "../../UI/button/Button";
import classes from "./Checkout.module.css";
import useInput from "../../../hooks/use-input";
import { FormEvent, useContext, useState } from "react";
import { Order } from "../../../types/order";
import axios from "axios";
import { BASE_URL } from "../../../constants/BACKEND";
import CartContext from "../../../store/cart-context";

type Props = {
  onClose: () => void;
};

const Checkout = ({ onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  const validate = (value: string) => value.length > 0;
  const {
    value: name,
    onChange: onNameChnage,
    isValid: nameIsValid,
    hasError: nameHasError,
    onBlur: onNameBlur,
  } = useInput(validate);
  const {
    value: street,
    onChange: onStreetChnage,
    isValid: streetIsValid,
    hasError: streetHasError,
    onBlur: onStreetBlur,
  } = useInput(validate);
  const {
    value: postalCode,
    onChange: onPostalCodeChnage,
    isValid: postalCodeIsValid,
    hasError: codeHasError,
    onBlur: onCodeBlur,
  } = useInput(validate);
  const {
    value: city,
    onChange: onCityChnage,
    isValid: cityIsValid,
    hasError: cityHasError,
    onBlur: onCityBlur,
  } = useInput(validate);

  const formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const nameClasses = nameHasError ? `form-control invalid` : "form-control";
  const streetClasses = streetHasError
    ? `form-control invalid`
    : "form-control";
  const codeClasses = codeHasError ? `form-control invalid` : "form-control";
  const cityClasses = cityHasError ? `form-control invalid` : "form-control";

  const order = async (data: Order) => {
    setIsLoading(true);
    const httpClient = axios.create({ baseURL: `${BASE_URL}orders.json` })
    try {
        await httpClient.post("", data);
        setIsLoading(false);
        setSubmitted(true);
        cartCtx.clear();
        setTimeout(() => {
            onClose();
        }, 3000)
    }
    catch (error) {
        setIsLoading(false);
        console.log(error);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;

    const meals = cartCtx.items?.map( meal => {
        return {
            name: meal.name, amount: (meal.amount as number)
        }
    });
    const formValue: Order = { name, street, postalCode, city, meals, totalAmount: cartCtx.totalAmount, date: new Date() };
    await order(formValue);
  };

  const formContent = <form onSubmit={submitHandler}>
  <div className={classes.formBody}>
    <div className={nameClasses}>
      <label htmlFor="name">Your Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={onNameChnage}
        onBlur={onNameBlur}
      />
      {nameHasError && <span className="error">Name is required</span>}
    </div>
    <div className={streetClasses}>
      <label htmlFor="street">Street</label>
      <input
        type="text"
        id="street"
        value={street}
        onChange={onStreetChnage}
        onBlur={onStreetBlur}
      />
      {streetHasError && <span className="error">Street is required</span>}
    </div>
    <div className={codeClasses}>
      <label htmlFor="code">Postal Code</label>
      <input
        type="text"
        id="code"
        value={postalCode}
        onChange={onPostalCodeChnage}
        onBlur={onCodeBlur}
      />
      {codeHasError && (
        <span className="error">Postal Code is required</span>
      )}
    </div>
    <div className={cityClasses}>
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={onCityChnage}
        onBlur={onCityBlur}
      />
      {cityHasError && <span className="error">City is required</span>}
    </div>
  </div>
  <div className={classes.formFooter}>
    <Button disabled={!formIsValid || isLoading}>{ isLoading ? 'Loading..' : 'Confirm' }</Button>
    <Button type="button" btnAlt={true} onClick={onClose}>
      Cancel
    </Button>
  </div>
</form>

  return (
    !submitted ? formContent :
    <div className={classes.confirmation}>Your data had been sent successfully!</div>
  );
};

export default Checkout;
