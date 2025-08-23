import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import QuestionPage from "./pages/QuestionPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
