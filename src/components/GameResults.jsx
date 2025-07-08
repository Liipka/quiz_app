const GameResults = ({corectAnswers, userAnswers, questions, decodeText}) => {
    
  return (
    <div>
        {questions.map((questionObj, i) => {
            const question = questionObj.question;
            const corectAnswer = corectAnswers[i]
            const userAnswer = userAnswers[i]
            const isCorectAnswer = userAnswer === corectAnswer
            
            return (
                <div key={i}>
                    <p>{i + 1}. {decodeText(question)}</p>
                    <div className="answers">
                        {isCorectAnswer && (
                            <p className="answer answer-correct">{decodeText(corectAnswer)}</p>
                        )}
                        {!isCorectAnswer && (
                            <>
                                <p className="answer answer-wrong">{decodeText(userAnswer)}</p>
                                <p className="answer answer-correct">{decodeText(corectAnswer)}</p>
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