import classes from './Button.module.css';

const Button = ({ children, onClick, className, disabled, ...props } : any) => {
    return (
        <button
            onClick={onClick}
            className={`${className} ${classes.button} ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;