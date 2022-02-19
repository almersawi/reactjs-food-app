import { useState } from "react";

type validate = (value: string) => boolean;

const useInput = (validate?: validate) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);

    const isValid = validate ? validate(value) : true;
    const hasError = !isValid && touched;

    const onChange = (event: any) => {
        setValue(event.target.value);
    }

    const onBlur = () => {
        setTouched(true);
    }

    return { value, onChange, isValid, onBlur, hasError };
}

export default useInput;