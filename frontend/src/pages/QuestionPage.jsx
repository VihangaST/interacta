import { useEffect, useState } from "react";
import Question from "../components/Question";
import axios from "axios";

function QuestionPage() {
  const [questionsList, setQuestionsList] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/questions")
      .then((res) => {
        console.log("Questions fetched successfully");
        setQuestionsList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
          <h1>Question Page</h1>
          {questionsList.map((question) => (
            <Question questionData={question} />
          ))}
        </div>
        <div className="container text-center">
          {Array.from({ length: questionCount }, (_, idx) => (
            <button
              className={`btn col fs-1 border rounded border-5 border-danger m-2 bg-danger-subtle fw-bold`}
              style={{ width: "100px", height: "100px" }}
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
