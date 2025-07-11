import GameResults from "./GameResults"

const FinishGame = ({changeMode, score, quizQuestions, decodeText}) => {

  return (
    <div className="container">
      <div className="finish-top-container">
        <h1 className="title">Quiz Game</h1>
        <h2 className="score-title">Your score:  <span>{score.gamePoints}/{Object.keys(quizQuestions).length}</span></h2>
      </div>
      <GameResults corectAnswers={score.corectAnswers} userAnswers={score.userAnswers} questions={quizQuestions} decodeText={decodeText}/>
      <button className="navigation-btn finish-game" onClick={() => changeMode('setGame')}>exit</button>
    </div>
  )
}
export default FinishGame