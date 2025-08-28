import { useState } from "react";

import axios from "axios";

function Form({
  descriptionBased,
  handleImageUpload,
  image,
  setDescriptionBased,
}) {
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

    // Add image to formData before sending
    const dataToSend = { ...formData, image };
    console.log("Form submitted:", formData);
    axios
      .post(
        "http://localhost:3000/api/questions/generate-description",
        dataToSend
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

    // Add image to formData before sending
    const dataToSend = { ...formData, image };

    console.log("Form submitted:", formData);
    axios
      .post("http://localhost:3000/api/questions/generate", dataToSend)
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
      <div
        className="w-50 container border rounded border-5 p-2  text-danger-emphasis d-flex justify-content-center"
        style={{ backgroundColor: "#B7E6A8FF" }}
      >
        <form
          onSubmit={
            descriptionBased ? handleSubmitDescriptionBased : handleSubmit
          }
          className="p-1 w-100 row"
        >
          <div className="row g-3 m-1">
            <div className="d-flex">
              <button
                className={`btn btn-${
                  descriptionBased ? "success" : "primary"
                } col font-monospace fs-6`}
                style={{
                  backgroundColor: descriptionBased ? "#1D793EFF" : "#25496EFF",
                }}
                onClick={() => setDescriptionBased(!descriptionBased)}
              >
                {descriptionBased
                  ? "Enable topic based generator"
                  : "Enable Description based generator"}
              </button>
            </div>
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
                Questions count
              </label>
              <input
                type="number"
                className="form-control"
                name="questionsCount"
                value={formData.questionsCount}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <div>
                <label className="form-label font-monospace fw-bold">
                  Upload Login Page Image :
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {image && (
                  <div className="mt-2">
                    <img
                      src={image}
                      alt="Preview"
                      style={{
                        maxWidth: "30px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>
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
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
