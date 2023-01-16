import {useState, ChangeEvent} from "react";

interface TUseForm {
    [key: string]: string;
}

//хук для контроля любого количества инпутов в любых формах
export const useForm = (inputValues: TUseForm) => {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }