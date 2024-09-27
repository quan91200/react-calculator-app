import React from 'react';

const Display = ({ result, calculatedResult }) => {
    return (
        <div className='calculated-result'>
            <input type="text" value={result} readOnly />
            <p className='result'>{calculatedResult}</p>
        </div>
    );
};

export default Display;
