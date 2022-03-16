import { useState, useRef } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const nameInputRef = useRef();

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    // nameInputRef.current.value = '' => NOT IDEAL, DON'T MANIPULATE THE DOM
    if(enteredName === ''){
      setIsValidName(true)
      return;
    }
     setEnteredName('');
  }

  const nameInputClasses = !isValidName ? 'form-control' : 'form-control invalid'
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
        />
        { isValidName && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
