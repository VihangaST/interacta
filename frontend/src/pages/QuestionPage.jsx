import { useEffect, useState } from "react";
import Question from "../components/Question";
import axios from "axios";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";

function QuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [marks, setMarks] = useState(0);
  const { username, topic } = location.state || { username: 0, topic: "" };
  // answered question count
  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [questionData, setQuestionData] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });
  // no of questions stored
  const [questionCount, setQuestionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [answeredQuestionsList, setAnsweredQuestionsList] = useState([]);

  const fetchQuestion = (idx) => {
    axios
      .post(`http://localhost:3000/api/questions/question-data/${idx}`, {
        topic,
      })
      .then((res) => {
        console.log("Questions fetched successfully");
        setQuestionData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // save user data at end
  const handleSubmit = async () => {
    // alert(`Username: ${username}, Marks: ${marks}`);
    axios
      .post("http://localhost:3000/api/user/save", { username, marks })
      .then((res) => {
        console.log(res.data);

        // setMessage({
        //   message: res.data.message,
        //   color: "green",
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Fetching question count...", topic);
    axios
      .post("http://localhost:3000/api/questions/questionCount", {
        topic,
      })
      .then((res) => {
        console.log(res.data);
        setQuestionCount(res.data.questionCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (answeredQuestions > 3) {
      alert("You have answered all questions!");
      setShowModal(true);
    }
  }, [answeredQuestions]);

  return (
    <>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false), handleSubmit({ username, marks });
          navigate("/login");
        }}
        username={username}
        marks={marks}
      >
        <h2>All Questions Answered</h2>
        <p>Username: {username}</p>
        <p>Your score: {marks}</p>
        <p>Thank you for completing the quiz!</p>
      </Modal>
      <main className="row min-vh-100 bg-secondary-subtle">
        {/* question number cards */}

        <div className="container text-center col m-5">
          {Array.from({ length: questionCount }, (_, idx) => (
            <button
              className={`btn col fs-1 border rounded border-5 border-danger m-2 bg-danger-subtle fw-bold`}
              style={{ width: "100px", height: "100px" }}
              disabled={answeredQuestionsList.includes(idx)}
              onClick={() => {
                fetchQuestion(idx);
                setAnsweredQuestionsList((prev) => [...prev, idx]);
              }}
            >
              {" "}
              Q{idx}
            </button>
          ))}
        </div>
        <div className="col m-5">
          <Question
            questionData={questionData}
            answeredQuestions={answeredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
            marks={marks}
            setMarks={setMarks}
          />
          <div>
            <CountDown />
          </div>
        </div>
      </main>
    </>
  );
}

export default QuestionPage;
