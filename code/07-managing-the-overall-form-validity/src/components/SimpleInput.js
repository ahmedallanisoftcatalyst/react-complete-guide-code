import useValidate from "./useValidate";

function ValidateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
const SimpleInput = (props) => {
  const nameValidate = useValidate((enteredField) =>
    enteredField.trim() === "" ? "Name must not be empty." : ""
  );
  const emailValidate = useValidate((enteredField) => {
    if (enteredField.trim() === "") {
      return "Email must not be empty.";
    }
    if(!ValidateEmail(enteredField)){
      return "Email must be a valid email.";
    }
    return ""
  });
  let formIsValid = false;

  if (nameValidate.enteredFieldIsValid && emailValidate.enteredFieldIsValid) {
    formIsValid = true;
  }
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    nameValidate.setEnteredFieldTouched(true);

    if (!formIsValid) {
      return;
    }
    console.log(nameValidate.enteredField, emailValidate.enteredField);

    // fieldInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    nameValidate.setEnteredField("");
    nameValidate.setEnteredFieldTouched(false);
    emailValidate.setEnteredField("");
    emailValidate.setEnteredFieldTouched(false);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameValidate.fieldInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameValidate.fieldInputChangeHandler}
          onBlur={nameValidate.fieldInputBlurHandler}
          value={nameValidate.enteredField}
        />
        {nameValidate.fieldInputIsInvalid && (
          <p className="error-text">{nameValidate.errorMsg}</p>
        )}
      </div>
      <div className={emailValidate.fieldInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailValidate.fieldInputChangeHandler}
          onBlur={emailValidate.fieldInputBlurHandler}
          value={emailValidate.enteredField}
        />
        {emailValidate.fieldInputIsInvalid && (
          <p className="error-text">{emailValidate.errorMsg}</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
