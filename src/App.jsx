import StartScreen from './components/startScreen'
import GameScreen from './components/GameScreen'
import Error from './components/Error'
import FinishGame from './components/FinishGame'
import { useState } from 'react'

function App() {
  const [gameMode, setGameMode] = useState('setGame') //setGame, playing, finish, error
  const [questions, setQuestions] = useState(null)

  const changeGameMode = mode => {
    setGameMode(mode)
  }
  
  let gameScreen;
  if (gameMode === 'setGame') gameScreen = <StartScreen changeMode={changeGameMode} setQuizQuestions={setQuestions}/>
  if (gameMode === 'playing') gameScreen = <GameScreen changeMode={changeGameMode} quizQuestions={questions}/>
  if (gameMode === 'error') gameScreen = <Error changeMode={changeGameMode} />
  if (gameMode === 'finish') gameScreen = <FinishGame />

  console.log(gameMode)
  return (
    <div className='main'>
    {gameScreen}
    </div>
  )
}

export default App

