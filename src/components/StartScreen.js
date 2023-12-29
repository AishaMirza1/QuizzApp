export default function StartScreen({ numQuestions, dispatch, status }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quizz</h2>
      {status !== "active" && (
        <>
          <h3>{numQuestions} questions to test your React mastery</h3>

          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "start" })}
          >
            Let's Start
          </button>
        </>
      )}
    </div>
  );
}
