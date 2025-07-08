import StartScreen from './components/startScreen'
import GameScreen from './components/GameScreen'
import Error from './components/Error'
import FinishGame from './components/FinishGame'
import { useState } from 'react'

function App() {
  const [gameMode, setGameMode] = useState('setGame') //setGame, playing, finish, error
  const [questions, setQuestions] = useState(null)
  const [gameScore, setGameScore] = useState()

  const changeGameMode = mode => {
    setGameMode(mode)
  }

  const returnGameScore = (userAnswers, corectAnswers) => {

    let points = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === corectAnswers[i]) {
        points++;
      }
    }

      const score = {
        gamePoints: points,
        corectAnswers,
        userAnswers
      }
      setGameScore(score)
  }

  const decodeHtmlEntities = (str) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, 'text/html');
      return doc.documentElement.textContent;
  }


  let gameScreen;
  if (gameMode === 'setGame') gameScreen = <StartScreen changeMode={changeGameMode} setQuizQuestions={setQuestions}/>
  if (gameMode === 'playing') gameScreen = <GameScreen changeMode={changeGameMode} quizQuestions={questions} collectAllAnswers={returnGameScore} decodeText={decodeHtmlEntities}/>
  if (gameMode === 'error') gameScreen = <Error changeMode={changeGameMode} />
  if (gameMode === 'finish') gameScreen = <FinishGame score={gameScore} quizQuestions={questions} decodeText={decodeHtmlEntities}/>

  return (
    <div className='main'>
    {gameScreen}
    </div>
  )
}

export default App

