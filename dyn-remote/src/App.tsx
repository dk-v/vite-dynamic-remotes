import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Hello from the dynamic remote! The count is: {count}
    </button>
  );
};

export default App;
