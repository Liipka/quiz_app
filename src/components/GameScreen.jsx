import { use, useState } from "react"
import Timer from "./Timer";

const GameScreen = ({quizQuestions, changeMode}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const currentQuestion = quizQuestions[currentQuestionIndex];
    let timeLeft=30
    


    console.log(currentQuestionIndex, quizQuestions.length)
    const shuffledAnswers = (currentQuestion) => {
        const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
        return allAnswers.sort(() => Math.random() - 0.5);
    }

    const decodeHtmlEntities = (str) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');
        return doc.documentElement.textContent;
    }

    // const changeToPrevQuestion = () => {
    //     if (currentQuestionIndex > 0) {
    //       setCurrentQuestionIndex((prev) => prev - 1);
    //     }
    //   };
    
      const changeToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      };

      const handleTimerEnd = () => {
        changeToNextQuestion()
      }

  return (
    <div className="container">
        
        <div className='question-container'>
            <div className="loader-container" key={currentQuestionIndex}>
                <div className="counter"><span>
                    <Timer key={currentQuestionIndex} duration={5} onTimeEnd={handleTimerEnd}/>
                    </span></div>
            </div>
            <div className="question-box">
                <p>
                    {decodeHtmlEntities(currentQuestion.question)}
                </p>
            </div>
            
            <div className="answers-box">
                {shuffledAnswers(currentQuestion).map((answer, i) => <label key={i} className="question-answer">{decodeHtmlEntities(answer)}
                <input type="radio" name="group" className="answer-checkbox"/></label>)}
            </div>
            <div className="navigation-buttons">
                {/* {currentQuestionIndex > 0 ? <button className="btn-prev navigation-btn" onClick={changeToPrevQuestion}>previous</button> : <button className="btn-prev transparent-btn">previous</button>} */}
                <button className="btn-prev transparent-btn">previous</button>
                <p className="question-number">{currentQuestionIndex + 1} / {quizQuestions.length}</p>
                {currentQuestionIndex + 1 < quizQuestions.length ? <button className="btn-next navigation-btn" onClick={changeToNextQuestion}>next</button>  : <button className="btn-next transparent-btn">next</button>}
            </div>
            <button onClick={() => changeMode('setGame')} className="navigation-btn exit-btn">exit</button>
        </div>
        
    </div>
  )
}
export default GameScreen