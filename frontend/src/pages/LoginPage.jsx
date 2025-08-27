// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import bhImage from "../assets/bg1.jpg";
// function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { topic } = location.state || { topic: "" };
//   const [userData, setUserData] = useState({
//     username: 0,
//     marks: 0,
//   });
//   const [message, setMessage] = useState({
//     message: "",
//     color: "",
//   });

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userData.username) {
//       setMessage({ message: "Please enter a number", color: "red" });
//       return;
//     }
//     navigate("/questions", {
//       state: { username: userData.username, topic: topic },
//     });
//     // axios
//     //   .post("http://localhost:3000/api/user/login", userData)
//     //   .then((res) => {
//     //     console.log(res.data);
//     //     navigate("/questions", { state: { username: userData.username } });

//     //     setMessage({
//     //       message: res.data.message,
//     //       color: "green",
//     //     });
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   };
//   return (
//     <>
//       <>
//         <main
//           // className=" min-vh-100 bg-success-subtle justify-content-center"
//           style={{
//             minHeight: "100vh",
//             backgroundImage: `url(${bhImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           className="justify-content-center"
//         >
//           {/* <img
//             src={bhImage}
//             style={{
//               width: "100%",
//               maxHeight: "200px",
//               objectFit: "cover",
//               marginBottom: "1rem",
//             }}
//             alt="BH"
//           /> */}

//           {/* <div className="p-5 mb-4 bg-success rounded-1 opacity-80">
//             <h1 className="text-center text-success-subtle fw-bold">
//               START QUIZ
//             </h1>
//           </div>{" "} */}
//           <div className="w-50 m-5 container border rounded border-5 border-danger p-3 mb-2 bg-danger-subtle text-danger-emphasis">
//             <form onSubmit={handleSubmit} className="p-5 w-100 row">
//               <div className="mb-3 col">
//                 <label
//                   for="username"
//                   className="form-label font-monospace fw-bold"
//                 >
//                   Number
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   aria-describedby="nameHelp"
//                   onChange={handleChange}
//                   value={userData.username}
//                 />
//               </div>

//               <div className="col">
//                 <button
//                   type="submit"
//                   className="btn btn-dark col font-monospace fs-3"
//                 >
//                   GO
//                 </button>
//               </div>
//             </form>
//             <div>{message.message}</div>
//           </div>
//         </main>
//       </>
//     </>
//   );
// }

// export default LoginPage;

import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import bhImage from "../assets/bg1.jpg";

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
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Left side with background image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${bhImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          <h1 className="fs-1 m-5"> Ready to Win ???</h1>

          <div
            className="bg-success container border rounded border-5 border-dark p-3 text-danger-emphasis"
            style={{ width: "80%", maxWidth: "400px" }}
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
