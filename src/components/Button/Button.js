import '../Button/Button.css';
import React, {useState} from 'react';

function Button(){

    /** This function creates the digits on the calculator */
    const createDigits = () =>{
        const digits = [];
        for (let index = 1; index < 10; index++) {
            digits.push(
                <button 
                    key={index} 
                    onClick={() => updateCalc(index.toString())}>
                    {index}
                </button>
            )
        }
        return digits;
    }

    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const operators = ['/', '*', '+', '-', '.'];

    /** On each click on any button of the calculator, check:
     *    if the monitor is empty and we're trying to implement operators on it (not a negative operator),
     *    or if we try to calculate a statement with any operator in the end - do nothing.
     *    Otherwise:
     *    add the given value to the current calc state.
     *    if the value given is not an operator, set the result state as well.
    */
    const updateCalc = (value) =>{
        if((operators.includes(value) && calc === '' && value !== '-') ||
            (operators.includes(value) && operators.includes(calc.slice(-1)))){
                return;
            }
        setCalc(calc + value);
        if(!operators.includes(value)){
            setResult(eval(calc + value).toString());
        }
    }
    
    /** Evaluate the String into a JS code and set the result in the clac state. */
    const calculate = () =>{
        setCalc(eval(calc).toString());
    }

    /** This function deletes the last element in the calc state. */
    const deleteLast = () =>{
        if(calc === ''){
            return;
        }
        const value = calc.slice(0, -1);
        setCalc(value);
        // If the calc state now ends with an operator, evaluate the string without that operator.
        if (operators.includes(value.slice(-1))) {
            setResult(eval(value.toString().slice(0,-1)));  
          }
          else{
            setResult(eval(value.toString()));  
          }
    }


    return(
        <div>
            <div className='monitor'>
                {result ? <span>({result})</span> : ''}&nbsp;
                {calc || "0"}
            </div>
            <div className='operators'>
                    <button onClick={() => updateCalc('/')}>/</button>
                    <button onClick={() => updateCalc('*')}>*</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={() => updateCalc('-')}>-</button>
                    <button onClick={() =>{deleteLast()}}>DEL</button>
            </div>
            <div className='digits'>
                    {createDigits()}
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>
                    <button onClick={() =>{calculate()}}>=</button>
            </div>
        </div>
    );
}

export default Button;