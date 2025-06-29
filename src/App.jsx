import StartScreen from './components/startScreen'
import GameScreen from './components/GameScreen'
import Error from './components/Error'
import { useState } from 'react'

function App() {
  const [gameMode, setGameMode] = useState('setGame') //setGame, playing, finish, error
  const [questions, setQuestions] = useState(null)

  const changeGameMode = mode => {
    setGameMode(mode)
  }
  console.log(gameMode)
  let gameScreen;
  if (gameMode === 'setGame') gameScreen = <StartScreen changeMode={changeGameMode} setQuizQuestions={setQuestions}/>
  if (gameMode === 'playing') gameScreen = <GameScreen changeMode={changeGameMode} quizQuestions={questions}/>
  if (gameMode === 'error') gameScreen = <Error />

  return (
    <>
    {gameScreen}
    </>
  )
}

export default App

