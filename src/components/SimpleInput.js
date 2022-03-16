import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

 const enteredNameIsValid = enteredName.trim() !== ''; 
 // if TextBox is not empty then "enteredNameIsValid" true
 // if TextBox is  empty then "enteredNameIsValid" false
 const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    // nameInputRef.current.value = '' => NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredNameTouched(true);
    if (!enteredName) {
      return;
    }
    setEnteredName('')
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  return (
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
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
