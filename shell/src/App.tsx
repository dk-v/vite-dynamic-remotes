import { useEffect, useState } from "react";
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

function App() {
  const [count, setCount] = useState(0);
  const [DynamicRemote, setDynamicRemote] = useState<any[]>([]);
  console.log(`Type of Dynamic Remote on the top is: ${typeof DynamicRemote}`);
  console.log(DynamicRemote);

  useEffect(() => {
    const remotes = [
      {
        name: "dyn",
        url: "http://localhost:4201/assets/remoteEntry.js",
        component: "./DynamicApp",
      },
      {
        name: "reg",
        url: "http://localhost:4202/assets/remoteEntry.js",
        component: "./RegularApp",
      },
    ];
    const loadRemotes = async () => {
      for (const remote of remotes) {
        __federation_method_setRemote(remote.name, {
          url: () => Promise.resolve(remote.url),
          format: "esm",
          from: "vite",
        });

        const moduleWrapped = await __federation_method_getRemote(
          remote.name,
          remote.component
        );
        const module = await __federation_method_unwrapDefault(moduleWrapped);
        setDynamicRemote((prevRemotes) => [...prevRemotes, module]);
      }
    };

    loadRemotes();
  }, []);

  if (DynamicRemote) {
    return (
      <>
        <h1>Test dynamic remotes</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        {DynamicRemote.map((Remote, index) => (
          <div key={index}>
            <Remote />
          </div>
        ))}
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
