import React from 'react';
import './index.scss';

const Input:React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({ ...args }) => (
    <label>
      <input {...args} />
    </label>
);
  
  export default Input;