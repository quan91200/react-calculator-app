import React from 'react';
import '../App.css'

const Button = ({ name, onClick, className }) => {
    return (
        <button name={name} onClick={onClick} className={className}>
            {name}
        </button>
    );
};

export default Button;
