import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [descriptionBased, setDescriptionBased] = useState(false);
  const [types, setTypes] = useState([]);
  const [image, setImage] = useState(null);

  const fetchTypes = async () => {
    axios
      .get("http://localhost:3000/api/questions/types")
      .then((res) => {
        const topics = res.data.topics;
        setTypes(topics);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTypes();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <main className="min-vh-100 bg-success-subtle">
        <div className="p-5 mb-4 bg-success rounded-1 opacity-80">
          <h1 className="text-center text-success-subtle fw-bold">
            GENERATE QUESTIONS
          </h1>
        </div>{" "}
        <div className="d-flex justify-content-center">
          <Form
            descriptionBased={descriptionBased}
            handleImageUpload={handleImageUpload}
            image={image}
            setDescriptionBased={setDescriptionBased}
          />
        </div>
        <div
          className="d-flex justify-content-between m-4 gap-3 border rounded border-dark p-5"
          style={{ backgroundColor: "#25496EFF" }}
        >
          <div className="w-50 btn-group">
            <button
              type="button"
              className="btn btn-dark col font-monospace fs-3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {topic || "Select Quiz Domain"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {types.map((type) => (
                <li key={type}>
                  <button
                    className="dropdown-item"
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
              className={`btn btn-dark col font-monospace fs-3 w-100 btn 
              } col font-monospace fs-6`}
              onClick={() => {
                navigate("/login", { state: { topic: topic, image: image } });
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
