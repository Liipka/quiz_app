import brainImage from './assets/brain.png'
function App() {

  return (
    <>
      <div className="container">
        <img src={brainImage} alt="brain" className="logo"/>
        <h1>quiz master</h1>
        <button>start the game</button>
      </div>
    </>
  )
}

export default App
