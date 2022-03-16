import { useReducer } from "react";
// step-1 add code
const iniatialInputState = {
  value: "",
  isTouched: false,
};

// step-2 add code
const inputStateReducer = (state, action) => {
    if(action.type ==='INPUT'){
        console.log('INPUT >>>', action.value, 'isTouched >>>', state.isTouched);
        return {value: action.value, isTouched: state.isTouched} // taking last state value changed => state.isTouched
    }
    if(action.type ==='BLUR'){
        console.log('BLUR >>>', action.value, 'isTouched >>>', state.isTouched);

        return{ isTouched: true, value: state.value}
    }
    if (action.type === 'RESET') {
        console.log('RESET >>>', action.value, 'isTouched >>>', state.isTouched);

        return { isTouched: false, value: '' };
      }
  return inputStateReducer;
};

const useInputReducer = (validateValue) => {
    // step-3 add code
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    iniatialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  // step-4 add code when action need
  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
  };
  const valueBlurHandler = () => {
    dispatch({type: 'BLUR'});
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInputReducer;
