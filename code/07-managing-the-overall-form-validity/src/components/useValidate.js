import { useState } from "react";

const useValidate = (validate, initial) => {
  const [enteredField, setEnteredField] = useState(initial ? initial : "");
  const [enteredFieldTouched, setEnteredFieldTouched] = useState(false);
  const errorMsg = validate(enteredField);
  const enteredFieldIsValid = errorMsg === "";
  const fieldInputIsInvalid = !enteredFieldIsValid && enteredFieldTouched;

  const fieldInputChangeHandler = (event) => {
    setEnteredField(event.target.value);
  };

  const fieldInputBlurHandler = (event) => {
    setEnteredFieldTouched(true);
  };

  const fieldInputClasses = fieldInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  return {
    enteredField,
    setEnteredField,
    enteredFieldTouched,
    setEnteredFieldTouched,
    fieldInputChangeHandler,
    fieldInputBlurHandler,
    errorMsg,
    fieldInputClasses,
    fieldInputIsInvalid,
    enteredFieldIsValid,
  };
};
export default useValidate;
