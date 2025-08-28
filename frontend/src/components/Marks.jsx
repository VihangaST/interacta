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
        }}
        className="p-3 bg-dark-subtle border rounded border-5 border-secondary"
      >
        <h5 className="">Questions</h5>
        <h1 style={{ fontSize: "4rem" }} className="font-weight-bold">
          {marks}{" "}
        </h1>
      </div>
    </>
  );
}

export default Marks;
