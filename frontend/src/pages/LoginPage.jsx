import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state || { topic: "" };
  const [userData, setUserData] = useState({
    username: 0,
    marks: 0,
  });
  const [message, setMessage] = useState({
    message: "",
    color: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.username) {
      setMessage({ message: "Please enter a number", color: "red" });
      return;
    }
    navigate("/questions", {
      state: { username: userData.username, topic: topic },
    });
    // axios
    //   .post("http://localhost:3000/api/user/login", userData)
    //   .then((res) => {
    //     console.log(res.data);
    //     navigate("/questions", { state: { username: userData.username } });

    //     setMessage({
    //       message: res.data.message,
    //       color: "green",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <>
      <>
        <div className="w-50 m-5 container border rounded border-5 border-danger p-3 mb-2 bg-danger-subtle text-danger-emphasis">
          <form onSubmit={handleSubmit} className="p-5 w-100 row">
            <div className="mb-3 col">
              <label
                for="username"
                className="form-label font-monospace fw-bold"
              >
                Number
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                aria-describedby="nameHelp"
                onChange={handleChange}
                value={userData.username}
              />
            </div>

            <div className="col">
              <button
                type="submit"
                className="btn btn-dark col font-monospace fs-3"
              >
                GO
              </button>
            </div>
          </form>
          <div>{message.message}</div>
        </div>
      </>
    </>
  );
}

export default LoginPage;
