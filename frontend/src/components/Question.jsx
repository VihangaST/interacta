import React, { useState } from "react";

function Question({ questionData, answeredQuestions, setAnsweredQuestions }) {
  const question = questionData.question;
  const options = questionData.options;

  const [selectedOption, setSelectedOption] = React.useState("");
  function handleSubmit(selectedOption) {
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }
    if (selectedOption === questionData.correctAnswer) {
      alert("Correct answer!");
    } else {
      alert(
        `Wrong answer! The correct answer is: ${questionData.correctAnswer}`
      );
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
                    setSelectedOption(option);
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
            handleSubmit(selectedOption);
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
