import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [realtimeValue, setRealtimeValue] = useState('');
  const [resultValue, setResultValue] = useState('0');
  const [operatorFlug, setOperatorFlug] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (number: string) => {
    if (currentValue === '0') {
      setCurrentValue(number);
      setRealtimeValue(realtimeValue + number);
      setOperatorFlug(true);
    } else {
      setCurrentValue(currentValue + number);
      setRealtimeValue(realtimeValue + number);
      setOperatorFlug(true);
    }
    //setResultValue(eval(realtimeValue));//ここでエラーが発生してそう
  };

  const handleOperatorClick = (op: string) => {
    if(operatorFlug == true){
      if (operator === null) {
        setCurrentValue('0');
        //初回
        setRealtimeValue(currentValue + op);
        setOperatorFlug(false);
        
      }
      setOperator(op);
      //初回以降
      setRealtimeValue(realtimeValue + op);
      setOperatorFlug(false);
    }

  };

  //この計算ロジックだと2つまでしか計算出来ない
  const calculate = () => {
    setResultValue(eval(realtimeValue));
    setOperator(null);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setRealtimeValue('');
    setResultValue('0');
    setOperator(null);
  };

  //計算過程が表示できるように修正したい
  //2行目はリアルタイムの計算結果を表示する
  return (
    <div className="calculator">
      {/* <Display value={currentValue} /> */}
      <Display value={realtimeValue} />
      <Display value={resultValue} />
      <div className="calculator-buttons">
        <div className="numbers">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
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
