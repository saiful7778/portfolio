import React, { useState } from "react";

export default function CounterBtn() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => {
        setCount((count) => count + 1);
      }}
      className="btn"
    >
      Count {count}
    </button>
  );
}
