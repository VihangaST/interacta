import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function LandingPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("cream cracker");
  const [descriptionBased, setDescriptionBased] = useState(false);
  const [types, setTypes] = useState([]);

  const fetchTypes = async () => {
    axios
      .get("http://localhost:3000/api/questions/types")
      .then((res) => {
        console.log(res.data);
        const topics = res.data.topics;
        setTypes(topics);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTypes();
  }, []);
  return (
    <>
      <main className="min-vh-100 bg-success-subtle">
        <div className="p-5 mb-4 bg-success rounded-1 opacity-80">
          <h1 className="text-center text-success-subtle fw-bold">
            GENERATE QUESTIONS
          </h1>
        </div>{" "}
        <div className="d-flex justify-content-between m-5 gap-3">
          <button
            className={`btn btn-${
              descriptionBased ? "success" : "primary"
            } col font-monospace fs-6`}
            onClick={() => setDescriptionBased(!descriptionBased)}
          >
            {descriptionBased
              ? "Enable topic based generator"
              : "Enable Description based generator"}
          </button>
          {/* <div class="btn-group">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Quiz Domain
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              {types.map((type) => (
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => setTopic(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className={`btn btn-${
              descriptionBased ? "success" : "primary"
            } col font-monospace fs-6`}
            onClick={() => {
              navigate("/login", { state: { topic: topic } });
            }}
          >
            Go to Login Page
          </button> */}
        </div>
        <div className="d-flex justify-content-center">
          <Form descriptionBased={descriptionBased} />
        </div>
        <div className="d-flex justify-content-between m-5 gap-3">
          <div class="w-50 btn-group">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Quiz Domain
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              {types.map((type) => (
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => setTopic(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-50">
            <button
              className={`w-100 btn btn-${
                descriptionBased ? "success" : "primary"
              } col font-monospace fs-6`}
              onClick={() => {
                // setTopic("cream cracker");
                navigate("/login", { state: { topic: topic } });
              }}
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
