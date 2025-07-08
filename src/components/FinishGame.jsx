import GameResults from "./GameResults"

const FinishGame = ({score, quizQuestions, decodeText}) => {

  return (
    <div className="container">
      <div className="finish-container">
        <h1 className="title">Quiz Game</h1>
        <h2>Your score:  <span>{score.gamePoints}/{Object.keys(quizQuestions).length}</span></h2>
      </div>
      <GameResults corectAnswers={score.corectAnswers} userAnswers={score.userAnswers} questions={quizQuestions} decodeText={decodeText}/>
      <button className="exit-button">exit</button>
    </div>
  )
}
export default FinishGame