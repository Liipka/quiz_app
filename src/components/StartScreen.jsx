import { useEffect, useState } from 'react';
import { quizCategories } from '../utils/data';
import brainImage from '../assets/brain.png';

const StartScreen = ({changeMode, setQuizQuestions}) => {
  const [questions, setQuestions] = useState();
  const [quizSettings, setQuizSettings] = useState({
    amount: 5,
    category: 9,
    difficulty: 'easy',
    type: 'multiple',
  });

  const getData = (e) => {
    e.preventDefault();
    fetch(
      `https://opentdb.com/api.php?amount=${quizSettings.amount}&category=${quizSettings.category}&difficulty=${quizSettings.difficulty}&type=${quizSettings.type}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuizQuestions(data.results)
        changeMode('playing')
    });
    
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <img src={brainImage} alt="brain" className="logo" />
      <h1>QUIZ MASTER</h1>
      <form className="form-container" onSubmit={getData}>
        <label className="form-element">
          Select number of questions 1 to 50:
          <input
            className="option"
            min={1}
            max={50}
            type="number"
            name="amount"
            defaultValue={5}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-element">
          Select Category:
          <select className="option" name="category" onChange={handleInputChange}>
            {quizCategories.map((category, i) => (
              <option key={category} value={i + 9}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="form-element">
          Select Difficulty:
          <select className="option" name="difficulty" onChange={handleInputChange}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </label>
        <label className="form-element">
          Select type:
          <select className="option" name="type" onChange={handleInputChange}>
            <option value="multiple">Multiple</option>
            <option value="boolean">True/False</option>
          </select>
        </label>
        <button className="form-btn">start the game</button>
      </form>
      
    </div>
  );
};

export default StartScreen;
