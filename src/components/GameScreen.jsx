import { use, useEffect, useState } from "react"
import Timer from "./Timer";

const GameScreen = ({quizQuestions, changeMode, collectAllAnswers}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [shuffledAnswers, setShuffledAnswers] = useState()
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [userAnswers, setUserAnswers] = useState([])

  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  console.log(correctAnswers)
  console.log(userAnswers)
  console.log(currentQuestion)

  const shuffleAnswers = (currentQuestion) => {
    const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
    return allAnswers.sort(() => Math.random() - 0.5);
  } 
  
  const collectUserAndCorrectAnswer = () => {
    setUserAnswers(answers => [...answers, selectedAnswer])
    setCorrectAnswers(answers => [...answers, currentQuestion.correct_answer])
  }

  useEffect(() => {
    if (currentQuestion) {
      const shuffled = shuffleAnswers(currentQuestion);
      setShuffledAnswers(shuffled);
    }
  }, [currentQuestionIndex]);

  const decodeHtmlEntities = (str) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(str, 'text/html');
          return doc.documentElement.textContent;
      }
    
  const changeToNextQuestion = () => {
    const updatedUserAnswers = [...userAnswers, selectedAnswer];
    const updatedCorrectAnswers = [...correctAnswers, currentQuestion.correct_answer];

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } 
    collectUserAndCorrectAnswer()

    if(currentQuestionIndex + 1 === quizQuestions.length) {
      collectAllAnswers(updatedUserAnswers, updatedCorrectAnswers);
      changeMode('finish')
    }
  };

  const handleTimerEnd = () => {
    const updatedUserAnswers = [...userAnswers, selectedAnswer];
    const updatedCorrectAnswers = [...correctAnswers, currentQuestion.correct_answer];

    collectAllAnswers(updatedUserAnswers, updatedCorrectAnswers);
    changeToNextQuestion();
  }

  if (!shuffledAnswers) return <div>Loading...</div>;

  return (
    <div className="container">
        <div className='question-container'>
            <div className="loader-container" key={currentQuestionIndex}>
                <div className="counter"><span>
                    <Timer key={currentQuestionIndex} duration={5} onTimeEnd={handleTimerEnd} questionIndex={currentQuestionIndex}/>
                    </span></div>
            </div>
            <div className="question-box">
                <p>
                    {decodeHtmlEntities(currentQuestion.question)}
                </p>
            </div>
          
            <div className="answers-box">
                {shuffledAnswers.map((answer, i) => (
                  <label key={i} className="question-answer">
                    {decodeHtmlEntities(answer)}
                    <input 
                    type="radio" 
                    name="group"
                    checked={selectedAnswer === answer}
                    onChange={() => setSelectedAnswer(answer)} 
                    className="answer-checkbox"/>
                  </label>
                ))
                }
            </div> 

            <div className="navigation-buttons">
                <button onClick={() => changeMode('setGame')} className="btn-exit navigation-btn">exit</button>
                <p className="question-number">{currentQuestionIndex + 1} / {quizQuestions.length}</p>

                {currentQuestionIndex + 1 < quizQuestions.length && 
                <button className="btn-next navigation-btn" onClick={changeToNextQuestion} disabled={!selectedAnswer}>next</button>}

                {currentQuestionIndex + 1 === quizQuestions.length && 
                <button className="btn-next navigation-btn" onClick={handleTimerEnd} disabled={!selectedAnswer}>finish</button>}
            </div>
        </div>
    </div>
  )
}
export default GameScreen