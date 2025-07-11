import { use, useEffect, useState } from "react"
import Timer from "./Timer";

const GameScreen = ({quizQuestions, changeMode, collectAllAnswers, decodeText}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [shuffledAnswers, setShuffledAnswers] = useState()
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [userAnswers, setUserAnswers] = useState([])

  const currentQuestion = quizQuestions[currentQuestionIndex];

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
    
  const changeToNextQuestion = () => {
    collectUserAndCorrectAnswer()
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } 

    if(currentQuestionIndex + 1 === quizQuestions.length) {
      const updatedUserAnswers = [...userAnswers, selectedAnswer];
      const updatedCorrectAnswers = [...correctAnswers, currentQuestion.correct_answer];

      collectAllAnswers(updatedUserAnswers, updatedCorrectAnswers);
      changeMode('finish')
    }
  };

  const handleTimerEnd = () => {
    const nextIndex = currentQuestionIndex + 1
    const isLastQuestion = nextIndex === quizQuestions.length

    const updatedUserAnswers = [...userAnswers, selectedAnswer];
    const updatedCorrectAnswers = [...correctAnswers, currentQuestion.correct_answer];
    collectAllAnswers(updatedUserAnswers, updatedCorrectAnswers);
    
    if (isLastQuestion) {
      changeMode('finish');
    } else {
      setUserAnswers(updatedUserAnswers);
      setCorrectAnswers(updatedCorrectAnswers);
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
    }
  }

  if (!shuffledAnswers) return <div>Loading...</div>;

  return (
    <div className="container">
        <div className='question-container'>
            <div className="loader-container" key={currentQuestionIndex}>
                <div className="counter"><span>
                    <Timer key={currentQuestionIndex} duration={30} onTimeEnd={handleTimerEnd} questionIndex={currentQuestionIndex}/> 
                    </span></div>
            </div>
            <div className="question-box">
                <p>
                    {decodeText(currentQuestion.question)}
                </p>
            </div>
          
            <div className="answers-box">
                {shuffledAnswers.map((answer, i) => (
                  <label key={i} className="question-answer">
                    {decodeText(answer)}
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