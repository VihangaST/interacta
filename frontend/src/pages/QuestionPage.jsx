import { useEffect, useState } from "react";
import Question from "../components/Question";
import axios from "axios";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";
import QuestionCount from "../components/QuestionCount";
import Marks from "../components/Marks";

function QuestionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [marks, setMarks] = useState(0);
  const { username, topic } = location.state || { username: 0, topic: "" };
  const [image, setImage] = useState(null);
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

  // fetch question data
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
    if (topic) {
      axios
        .get(`http://localhost:3000/api/questions/image/${topic}`)
        .then((res) => setImage(res.data.image))
        .catch(() => setImage(null));
    }
  }, []);

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
      // alert("You have answered all questions!");
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
        <h2 className="mb-2">You Have Answered All 3 Questions...</h2>
        <h5>Username: {username}</h5>
        <h5>Your score: {marks}</h5>
        <h6 style={{ color: "#4C0101FF" }}>
          {marks == 30
            ? "Congratulations! You are a Winner"
            : "Game Over! Better Luck Next Time"}
        </h6>
        <h6 className="m-3" style={{ color: "#CA1BADFF" }}>
          Thank you for completing the quiz!
        </h6>
      </Modal>

      <main
        className="row max-vh-100 w-100"
        style={{
          background: "linear-gradient(135deg, #FE91DEFF 0%, #25496E 100%)",
        }}
      >
        {/* question number cards */}

        <div
          className="container text-center rounded col m-5"
          style={{
            // backgroundColor: "#FFFFFFFF",
            maxHeight: "650px",
            height: "100%",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#25496E #FE91DE",
            direction: "rtl",
          }}
        >
          {Array.from({ length: questionCount }, (_, idx) => (
            <button
              className={`btn col fs-1 rounded m-2 bg-danger-subtle fw-bold`}
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
          <div className="d-flex justify-content-between mb-5">
            <QuestionCount answeredQuestions={answeredQuestions} />
            <Marks marks={marks} />

            <CountDown />
          </div>
          <div>
            <Question
              questionData={questionData}
              answeredQuestions={answeredQuestions}
              setAnsweredQuestions={setAnsweredQuestions}
              marks={marks}
              setMarks={setMarks}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default QuestionPage;
