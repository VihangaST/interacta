import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function LandingPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("cream cracker");
  const [descriptionBased, setDescriptionBased] = useState(false);
  return (
    <>
      <main className="min-vh-100 bg-secondary-subtle">
        <div>
          <button
            className={`btn btn-${
              descriptionBased ? "success" : "primary"
            } col font-monospace fs-6`}
            onClick={() => setDescriptionBased(!descriptionBased)}
          >
            {descriptionBased ? "Enable topic based" : "Enable Description"}
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <Form descriptionBased={descriptionBased} />
        </div>
        <button
          onClick={() => {
            // setTopic("cream cracker");

            navigate("/login", { state: { topic: topic } });
          }}
        >
          Login
        </button>
      </main>
    </>
  );
}

export default LandingPage;
