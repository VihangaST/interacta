import React, { useState, useEffect } from "react";
import { use } from "react";

function Question({
  questionData,
  answeredQuestions,
  setAnsweredQuestions,
  showQuestion = true,
  marks,
  setMarks,
}) {
  const question = questionData.question;
  const options = questionData.options;
  const correctAnswer = questionData.correctAnswer;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  // Reset state when questionData changes
  useEffect(() => {
    setIsSubmitted(false);
    setSelectedOption(null);
  }, [questionData]);

  const [selectedOption, setSelectedOption] = useState(null);
  // handleSubmit function
  function handleSubmit() {
    if (selectedOption === null) {
      alert("Please select an option before submitting.");
      return;
    }
    setIsSubmitted(true);
    console.log("Selected option:", selectedOption);
    console.log("Correct answer:", correctAnswer);
    // alert("selected " + selectedOption, correctAnswer);
    if (selectedOption == correctAnswer) {
      setMarks(marks + 10);
      // alert("Correct answer!", marks);
      setIsCorrect(true);
    } else {
      alert(`Wrong answer! The correct answer is: ${correctAnswer}`);
      setIsCorrect(false);
    }
  }

  return (
    <>
      {showQuestion && question && !isSubmitted ? (
        <div className="container border rounded border-5 border-primary p-3 mb-2 text-danger-emphasis">
          <h5
            className="font-monospace mb-4 p-2 rounded"
            style={{ backgroundColor: "#B8CCFFD1", color: "#000000" }}
          >
            {question.replace(/\*/g, "")}
          </h5>
          <div
            className="m-2"
            style={{ minHeight: "180px", minWidth: "300px" }}
          >
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
                    style={{ color: "#000000" }}
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
      ) : (
        <div
          className="align-items-center container border rounded display-6 fw-bold font-monospace border-5 border-primary p-3 mb-2 text-dark"
          style={{
            minHeight: "350px",
            minWidth: "300px",
            backgroundColor: "#C7D7FFD1",
            color: "#000000",
          }}
        >
          Select your Lucky Number ...
        </div>
      )}

      <div
        className="align-items-center container rounded display-6 fw-bold font-monospace border-5 p-3 mt-5 text-dark"
        style={{
          height: "60px", // <-- fixed height
          minWidth: "300px",
          backgroundColor: isSubmitted
            ? isCorrect
              ? "#0CC72ED1"
              : "#F40000FF"
            : "#C7D7FFD1",
          color: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: isCorrect ? "5px solid green" : "5px solid red",
        }}
      >
        {isSubmitted ? (isCorrect ? "Wow, Correct!" : "Oh Wrong!") : ""}
      </div>
    </>
  );
}

export default Question;
