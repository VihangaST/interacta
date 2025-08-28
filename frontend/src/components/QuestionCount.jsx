import { useEffect, useState } from "react";

function QuestionCount({ answeredQuestions }) {
  return (
    <>
      <div
        style={{
          width: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1E1E1EFF",
        }}
        className="p-3 rounded"
      >
        <h5 style={{ color: "#CEFFE0FF" }}>Questions</h5>
        <h1
          style={{ fontSize: "4rem", color: "#CEFFE0FF" }}
          className="font-weight-bold"
        >
          {answeredQuestions - 1}/3{" "}
        </h1>
      </div>
    </>
  );
}

export default QuestionCount;
