import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameInputRef = useRef();

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("valid name!!");
    }
  }, [enteredNameIsValid]);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if(event.target.value.trim() !== ''){
      setEnteredNameIsValid(true)
    }
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    // nameInputRef.current.value = '' => NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);
    setEnteredName('')
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  console.log("nameInputIsInvalid >>", nameInputIsInvalid);
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
          ref={nameInputRef}
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
