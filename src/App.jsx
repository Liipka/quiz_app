import StartScreen from './components/startScreen'
import GameScreen from './components/GameScreen'
import { useState } from 'react'

function App() {
  const [gameMode, setGameMode] = useState('setGame') //setGame, playing, finish
  const [questions, setQuestions] = useState(null)

  const changeGameMode = mode => {
    setGameMode(mode)
  }

  let gameScreen;
  console.log(questions)

  if (gameMode=== 'setGame') gameScreen = <StartScreen changeMode={changeGameMode} setQuizQuestions={setQuestions}/>
  if (gameMode=== 'playing') gameScreen = <GameScreen changeMode={changeGameMode} quizQuestions={questions}/>

  return (
    <>
    {gameScreen}
    </>
  )
}

export default App
