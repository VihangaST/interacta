import { useEffect, useState } from "react";

function Marks({ marks }) {
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
        <h5 style={{ color: "#CEFFE0FF" }}>Marks</h5>
        <h1
          style={{ fontSize: "4rem", color: "#CEFFE0FF" }}
          className="font-weight-bold"
        >
          {marks}{" "}
        </h1>
      </div>
    </>
  );
}

export default Marks;
