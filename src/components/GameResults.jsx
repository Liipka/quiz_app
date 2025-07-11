const GameResults = ({corectAnswers, userAnswers, questions, decodeText}) => {
    
  return (
    <div className="game-results-container">
        {questions.map((questionObj, i) => {
            const question = questionObj.question;
            const corectAnswer = corectAnswers[i]
            const userAnswer = userAnswers[i]
            const isCorectAnswer = userAnswer === corectAnswer
            
            return (
                <div key={i} className="finish-answer-container">
                    <p className="question">{i + 1}. {decodeText(question)}</p>
                    <div className="answers">
                        {isCorectAnswer && (
                            <p className="answer answer-corect">Your answer: {decodeText(corectAnswer)}</p>
                        )}
                        {!isCorectAnswer && (
                            <>
                                <p className="answer answer-wrong">{userAnswer ? 'Your answer: ' + decodeText(userAnswer) : "You didn't respond..."}</p>
                                <p className="answer answer-corect">Correct answer: {decodeText(corectAnswer)}</p>
                            </>
                        )}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
export default GameResults