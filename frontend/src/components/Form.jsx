import { useState } from "react";

import axios from "axios";

function Form({ descriptionBased }) {
  const [formData, setFormData] = useState({
    festivalName: "",
    questionsCount: 1,
    description: "",
  });

  const [message, setMessage] = useState({ color: "warning", message: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitDescriptionBased = (e) => {
    e.preventDefault();
    if (
      formData.questionsCount < 1 ||
      !formData.festivalName ||
      !formData.description
    ) {
      setMessage({ color: "danger", message: "Please fill in all fields" });
      return;
    }
    console.log("Form submitted:", formData);
    axios
      .post(
        "http://localhost:3000/api/questions/generate-description",
        formData
      )
      .then(
        () => console.log("Data submitted successfully"),
        setMessage({
          color: "success",
          message: "Questions generated successfully!",
        })
      )
      .catch((error) => {
        console.error("Error submitting data:", error);
        setMessage({ color: "danger", message: "Error generating questions." });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.questionsCount < 1 || !formData.festivalName) {
      setMessage({ color: "danger", message: "Please fill in all fields" });
      return;
    }

    console.log("Form submitted:", formData);
    axios
      .post("http://localhost:3000/api/questions/generate", formData)
      .then(
        () => console.log("Data submitted successfully"),
        setMessage({
          color: "success",
          message: "Questions generated successfully!",
        })
        // setFormData({ festivalName: "", questionsCount: 0 })
      )
      .catch((error) => {
        console.error("Error submitting data:", error);
        setMessage({ color: "danger", message: "Error generating questions." });
      });
  };
  return (
    <>
      <div className="w-50 m-3 container border rounded border-5 border-danger p-3 bg-danger-subtle text-danger-emphasis">
        <form
          onSubmit={
            descriptionBased ? handleSubmitDescriptionBased : handleSubmit
          }
          className="p-5 w-100 row"
        >
          <div className="mb-3 col">
            <label
              for="festivalName"
              className="form-label font-monospace fw-bold"
            >
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              name="festivalName"
              aria-describedby="nameHelp"
              onChange={handleChange}
              value={formData.festivalName}
            />
          </div>
          {/* display only descriptionBased true */}
          {descriptionBased && (
            <div className="mb-3 col">
              <label
                for="description"
                className="form-label font-monospace fw-bold"
              >
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                aria-describedby="nameHelp"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
          )}
          <div className="mb-3 col">
            <label
              for="questionsCount"
              className="form-label font-monospace fw-bold"
            >
              Questions
            </label>
            <input
              type="number"
              className="form-control"
              name="questionsCount"
              value={formData.questionsCount}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <button
              type="submit"
              className="btn btn-dark col font-monospace fs-3"
            >
              Generate Questions
            </button>
          </div>
          <p> {message.message}</p>
        </form>

        <div>
          {/* <button
            className={`btn btn-${message.color} col font-monospace fs-6`}
          >
            {message.message}
          </button> */}
        </div>
      </div>
    </>
  );
}

export default Form;
