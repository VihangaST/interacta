import { useState } from "react";

import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    festivalName: "",
    questionsCount: 1,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    axios
      .post("http://localhost:3000/api/questions/generate", formData)
      .then(
        () => console.log("Data submitted successfully"),
        setFormData({ festivalName: "", questionsCount: 0 })
      )
      .catch((error) => console.error("Error submitting data:", error));
  };
  return (
    <>
      <div className="w-50 m-5 container border rounded border-5 border-danger p-3 mb-2 bg-danger-subtle text-danger-emphasis">
        <form onSubmit={handleSubmit} className="p-5 w-100 row">
          <div className="mb-3 col">
            <label
              for="festivalName"
              className="form-label font-monospace fw-bold"
            >
              Festival
            </label>
            <input
              type="text"
              className="form-control"
              name="festivalName"
              aria-describedby="nameHelp"
              onChange={handleChange}
              value={formData.festivalName}
            />
            {/* <div id="nameHelp" className="form-text font-monospace">
              Enter the name of the festival
            </div> */}
          </div>
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
              className="btn btn-success col font-monospace fs-3"
            >
              Generate Questions
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
