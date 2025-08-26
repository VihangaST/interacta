import { useEffect, useState } from "react";

function CountDown() {
  const [seconds, setSeconds] = useState(90);

  useEffect(() => {
    if (seconds < 1) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

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
        <h5 className="">Countdown</h5>
        <h1 style={{ fontSize: "4rem" }} className="font-weight-bold">
          {seconds}{" "}
        </h1>
      </div>
    </>
  );
}

export default CountDown;
