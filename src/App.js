import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import RestartBtn from "./components/Restartbtn";
import Timer from "./components/Timer";

const initialState = {
  questions: [],

  // loading , ready,active,error,finishd
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secsRemaining: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "Error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secsRemaining: state.questions.length * 30,
      };
    case "tick":
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
        status: state.secsRemaining === 0 ? "finish" : state.status,
      };
    case "newAnswer":
      let question = state.questions.at(state.index);
      console.log(state.points);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "active" };
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [
    { status, questions, index, answer, points, secsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  const numQuestions = questions.length;
  useEffect(() => {
    fetch("https://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secsRemaining={secsRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finish" && (
          <>
            <Finish points={points} maxPossiblePoints={maxPoints} />
            <RestartBtn dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
