import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (number: string) => {
    if (currentValue === '0') {
      setCurrentValue(number);
    } else {
      setCurrentValue(currentValue + number);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (operator === null) {
      setPreviousValue(currentValue);
      //setCurrentValue('0');
      //表示用のcurrentValueと計算用のvalueを分けた方が良いかも
      setCurrentValue(currentValue + op);
    }
    setOperator(op);
  };

  const calculate = () => {
    if (!operator || !previousValue) return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    let result = 0;
    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = curr !== 0 ? prev / curr : 0;
        break;
      default:
        break;
    }

    setCurrentValue(result.toString());
    setPreviousValue('');
    setOperator(null);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue('');
    setOperator(null);
  };

  //計算過程が表示できるように修正したい
  return (
    <div className="calculator">
      <Display value={currentValue} />
      <div className="calculator-buttons">
        <div className="numbers">
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
            <Button key={num} label={num} onClick={() => handleNumberClick(num)} />
          ))}
        </div>
        <div className="operators">
          {['+', '-', '*', '/'].map((op) => (
            <Button key={op} label={op} onClick={() => handleOperatorClick(op)} />
          ))}
          <Button label="=" onClick={calculate} />
          <Button label="C" onClick={handleClear} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
