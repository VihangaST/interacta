import React, { useState } from "react";

function Question({
  questionData,
  answeredQuestions,
  setAnsweredQuestions,
  marks,
  setMarks,
}) {
  const question = questionData.question;
  const options = questionData.options;
  const correctAnswer = questionData.correctAnswer;

  const [selectedOption, setSelectedOption] = useState(null);
  // handleSubmit function
  function handleSubmit() {
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }
    console.log("Selected option:", selectedOption);
    console.log("Correct answer:", correctAnswer);
    alert("selected " + selectedOption, correctAnswer);
    if (selectedOption == correctAnswer) {
      setMarks(marks + 10);
      alert("Correct answer!", marks);
    } else {
      alert(`Wrong answer! The correct answer is: ${correctAnswer}`);
    }
  }

  return (
    <>
      <div className="container border rounded border-5 border-primary p-3 mb-2 text-danger-emphasis">
        <h5 className="font-monospace mb-4">{question.replace(/\*/g, "")}</h5>
        <div className="m-2">
          {options.map((option, index) => {
            return (
              <div className="form-check m-2" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioDefault"
                  value={option}
                  id={`radioDefault${index}`}
                  onChange={() => {
                    setSelectedOption(index);
                  }}
                />
                <label
                  className="form-check-label font-monospace"
                  htmlFor={`radioDefault${index}`}
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            handleSubmit();
            setAnsweredQuestions(answeredQuestions + 1);
            console.log("answeredQuestions", answeredQuestions);
          }}
          className={`btn font-monospace btn-primary col fs-6`}
        >
          submit
        </button>
      </div>
    </>
  );
}

export default Question;
