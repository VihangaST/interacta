import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(null);

  const { topic } = location.state || {};

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

  useEffect(() => {
    if (topic) {
      axios
        .get(`http://localhost:3000/api/questions/image/${topic}`)
        .then((res) => setImage(res.data.image))
        .catch(() => setImage(null));
    }
  }, [topic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.username) {
      setMessage({ message: "Please enter a number", color: "red" });
      return;
    }
    navigate("/questions", {
      state: { username: userData.username, topic: topic },
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side with uploaded image */}
      <div
        style={{
          flex: 1,
          background: image ? `url(${image}) center/cover no-repeat` : "#eee",
        }}
      ></div>
      {/* Right side with form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#B1DCADFF",
        }}
      >
        <div className="justify-content-center">
          <h1
            className="text-center display-3 fs-0 fw-bold"
            style={{ color: "#186312FF" }}
          >
            Interacta
          </h1>

          <h1 className="text-center display-3 fs-1 fw-bold m-5">
            {" "}
            Ready to Win ???
          </h1>

          <div
            className="bg-success container border rounded border-5 border-dark p-3 text-danger-emphasis"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <form onSubmit={handleSubmit} className="p-5 w-100 row ">
              <div className="col" style={{ height: "100px" }}>
                <label
                  htmlFor="username"
                  className="form-label text-dark font-monospace fw-bold fs-9"
                >
                  Number
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  name="username"
                  aria-describedby="nameHelp"
                  onChange={handleChange}
                  value={userData.username}
                />
              </div>
              <div className="col">
                <button
                  type="submit"
                  style={{ width: "100%", height: "70px" }}
                  className="btn btn-dark col font-monospace fs-3"
                >
                  GO
                </button>
              </div>
            </form>
            <div>{message.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
