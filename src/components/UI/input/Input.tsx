import { forwardRef } from 'react';
import classes from './Input.module.css'; 

type Props = {
    label: string;
    input: any;
    ref: any
}

const Input = forwardRef(
    ({ label, input } : Props, ref) => {
        return (
            <div className={classes.input}>
                <label htmlFor={input.id}>{label}</label>
                <input ref={ref} {...input} />
            </div>
        )
    }
)

export default Input;