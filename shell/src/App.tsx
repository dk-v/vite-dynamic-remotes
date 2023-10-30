import { useEffect, useState } from "react";

import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault, //@ts-expect-error
} from "virtual:__federation__";

function App() {
  const [dynamicRemotes, setDynamicRemotes] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const remotes = [
    //   {
    //     name: "dyn",
    //     url: "http://localhost:4201/assets/remoteEntry.js",
    //     component: "./DynamicApp",
    //   },
    //   {
    //     name: "reg",
    //     url: "http://localhost:4202/assets/remoteEntry.js",
    //     component: "./RegularApp",
    //   },
    // ];

    async function mockFetchRemotes() {
      return new Promise<Array<any>>((resolve, reject) => {
        // Simulate a delay to mimic an API call
        setTimeout(() => {
          const mockData = [
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
          resolve(mockData);
        }, 1000); // Simulating a 1-second delay
      });
    }

    const loadRemotes = async () => {
      const remotes = mockFetchRemotes();
      for (const remote of await remotes) {
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
        if (!dynamicRemotes.includes(module)) {
          setDynamicRemotes((prevRemotes) => [...prevRemotes, module]);
        }
        // setLoading(false);
      }
    };

    loadRemotes();
    // console.log(dynamicRemotes);
  }, []);

  if (dynamicRemotes.length > 0) {
    return (
      <>
        <h1>Test dynamic remotes</h1>
        {dynamicRemotes.map((Remote, index) => {
          return (
            <div key={index}>
              <Remote />
            </div>
          );
        })}
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
