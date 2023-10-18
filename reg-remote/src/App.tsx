import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(() => count + 1)}>
      Regular remote {count} swag
    </button>
  );
}

export default App;
