import { useState } from "react";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState({
    message: "",
    color: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUsername({
      ...username,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    axios
      .post("http://localhost:3000/api/questions/login", username)
      .then((res) => {
        console.log(res.data);
        setMessage({
          message: res.data.message,
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
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
                value={username}
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
