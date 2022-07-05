import "./App.css";
import { useState } from "react";
import { questionSet } from "./components/QuestionsSet";
function App() {
  const [ques, setQues] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showScore, setshowScore] = useState(false);
  const [color, setColor] = useState({
    activeObject: null,
    objects: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
  });
  const toggleActiveStyle = (index) => {
    if (color.objects[index] === color.activeObject) {
      return "active";
    } else {
      return "btn-option";
    }
  };
  const optionHandler = (isCorrect, index) => {
    setColor({ ...color, activeObject: color.objects[index] });

    if (isCorrect) {
      setScore(score + 1);
      setClicked(true);
    }
    setClicked(false);
  };
  const nextQuestionHandler = () => {
    setClicked(false);
    if (ques < questionSet.length - 1) {
      setQues(ques + 1);
    } else {
      setshowScore(true);
    }
  };
  return (
    <div className="App">
      {showScore ? (
        <div className="score-box">
          <h1>Your Score is </h1>
          <p>
            {score}/{questionSet.length}
            <button className="btn-reset">Reset</button>
          </p>
        </div>
      ) : (
        <>
          <div className="question-section">
            {questionSet[ques].questionText.toUpperCase()}
          </div>
          <div className="quesans">
            {questionSet[ques].answerOptions.map((options, idx) => {
              return (
                <div key={idx}>
                  <button
                    disabled={clicked}
                    value={options.answerText}
                    className={toggleActiveStyle(idx)}
                    onClick={() => optionHandler(options.isCorrect, idx)}
                  >
                    {options.answerText}
                  </button>
                </div>
              );
            })}
          </div>

          <button className="btn-next" onClick={nextQuestionHandler}>
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default App;
