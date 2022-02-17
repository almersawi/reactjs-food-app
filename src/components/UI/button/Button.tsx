import classes from './Button.module.css';

const Button = ({ children, onClick, className, disabled, btnAlt,...props } : any) => {
    return (
        <button
            onClick={onClick}
            className={`${className} ${classes.button} ${disabled ? 'disabled' : ''} ${btnAlt ? classes.btn_alt : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;