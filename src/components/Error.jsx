const Error = () => {
  
  return (
    <div className="error-container">
      <h1 className="error-text error-header">There has been an error while trying to get questions to your quiz....</h1>
      <h2 className="error-text error-subtitle">Please try again</h2>
      <button className="error-btn">Try Again</button>
    </div>
  )
}
export default Error