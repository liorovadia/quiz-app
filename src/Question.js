import React from 'react';
import './App.css';

const Question = ({ question, options, handleAnswer }) => {
  return (
    <div className="Question">
      <h2>{question}</h2>
      <div className="Options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
