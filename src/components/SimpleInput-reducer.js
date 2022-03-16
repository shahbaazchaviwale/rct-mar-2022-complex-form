import useInputReducer from "../hooks/use-input-reducer";

const SimpleInputReducer = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInputReducer((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsInvalid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInputReducer((value) => value.includes("@"));

  let isFormValid = false;

  if (enteredNameIsValid && enteredEmailIsInvalid) {
    isFormValid = true;
  }

  const formSubmit = (event) => {
    event.preventDefault();
    // nameInputRef.current.value = '' => NOT IDEAL, DON'T MANIPULATE THE DOM
    if (!enteredNameIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div>
      <h1>Form validaioon using useReducer</h1>
      <form onSubmit={formSubmit}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            value={enteredName}
            onBlur={nameInputBlurHandler}
          />
          {nameInputHasError && (
            <p className="error-text">Name must not be empty</p>
          )}
        </div>

        <div className={emailInputClasses}>
          <label htmlFor="name">Your Email-ID</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            value={enteredEmail}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className="error-text">Email must contain '@'</p>
          )}
        </div>

        <div className="form-actions">
          <button disabled={!isFormValid}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SimpleInputReducer;
