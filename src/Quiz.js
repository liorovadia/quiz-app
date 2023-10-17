import React, { useState, useEffect } from 'react';
import Question from './Question';
import Score from './Score';
import './App.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [numQuestions, setNumQuestions] = useState(5); // Default to 5 questions
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty level
  const [category, setCategory] = useState("any"); // Default category is 9

  // Generate an array of numbers from 9 to 27
  const categoryOptions = Array.from({ length: 19 }, (_, i) => i + 9);

  const categoryNames = {
    9: 'General Knowledge',
    10: 'Entertainment: Books',
    11: 'Entertainment: Film',
    12: 'Entertainment: Music',
    13: 'Entertainment: Musicals & Theatres',
    14: 'Entertainment: Television',
    15: 'Entertainment: Video Games',
    16: 'Entertainment: Board Games',
    17: 'Science & Nature',
    18: 'Science: Computers',
    19: 'Science: Mathematics',
    20: 'Mythology',
    21: 'Sports',
    22: 'Geography',
    23: 'History',
    24: 'Politics',
    25: 'Art',
    26: 'Celebrities',
    27: 'Animals'
  };  
  
  useEffect(() => {
    let apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${difficulty}`;

    if (category !== 'any') {
    apiUrl += `&category=${category}`;
  }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setQuestions(data.results))
      .catch(error => console.error('Error fetching questions:', error));
  }, [numQuestions, difficulty, category]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('Quiz finished! Your score is ' + score);
    }
  };

  return (
    <div className="Quiz">
      <div className="OptionsContainer">
        <label>
          Number of Questions:
          <br />
          <input
            className="SmallInput"
            type="number"
            value={numQuestions}
            onChange={e => setNumQuestions(e.target.value)}
          />
        </label>
        <label>
          Difficulty:
          <br />
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
            Category:
            <br />
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="any">Any</option>
                {categoryOptions.map(option => (
                <option key={option} value={option}>
                    {categoryNames[option]}
                </option>
                ))}
            </select>
        </label>
      </div>
      {questions.length > 0 ? (
        <div>
          <Question
            question={questions[currentQuestion].question}
            options={[
              ...questions[currentQuestion].incorrect_answers,
              questions[currentQuestion].correct_answer
            ]}
            handleAnswer={handleAnswer}
          />
          <Score score={score} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Quiz;
