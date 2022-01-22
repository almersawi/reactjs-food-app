import classes from './Input.module.css'; 

type Props = {
    label: string;
    input: any
}

const Input = ({ label, input } : Props) => {
    return (
        <div className={classes.input}>
            <label htmlFor={input.id}>{label}</label>
            <input {...input} />
        </div>
    )
}

export default Input;