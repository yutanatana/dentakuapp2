import React from 'react';

type DisplayProps = {
  value: string;
};

const Display: React.FC<DisplayProps> = ({ value }) => {
  return <div className="calculator-display">{value}</div>;
};

export default Display;
