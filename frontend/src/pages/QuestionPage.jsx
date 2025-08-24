import { useEffect, useState } from "react";
import Question from "../components/Question";
import axios from "axios";

function QuestionPage() {
  const [questionData, setQuestionData] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });
  const [questionCount, setQuestionCount] = useState(0);
  const fetchQuestions = (idx) => {
    axios
      .get(`http://localhost:3000/api/questions/question-data/${idx}`)
      .then((res) => {
        console.log("Questions fetched successfully");
        setQuestionData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/questions/questionCount")
      .then((res) => {
        console.log(res.body);
        setQuestionCount(res.data.questionCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <main className="min-vh-100 bg-secondary-subtle">
        <div>
          <Question questionData={questionData} />
        </div>

        {/* quesytion number cards */}
        <div className="container text-center">
          {Array.from({ length: questionCount }, (_, idx) => (
            <button
              className={`btn col fs-1 border rounded border-5 border-danger m-2 bg-danger-subtle fw-bold`}
              style={{ width: "100px", height: "100px" }}
              onClick={() => {
                fetchQuestions(idx);
              }}
            >
              {" "}
              Q {idx}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}

export default QuestionPage;
