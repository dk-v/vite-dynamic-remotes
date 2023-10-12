import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DynWrapper from "./DynWrapper";
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

function App() {
  const [count, setCount] = useState(0);

  // @ts-expect-error temp module definition
  // const DynApp = React.lazy(() => import("dyn/DynamicApp"));
  // const RegApp = React.lazy(() => import("reg/RegularApp"));
  __federation_method_setRemote("dyn", {
    url: () => Promise.resolve("http://localhost:4201/assets/remoteEntry.js"),
    format: "esm",
    from: "vite",
  });

  // // Get the remote module "./DynamicApp"
  // __federation_method_getRemote("dyn", "./DynamicApp")
  //   .then((moduleWrapped) => __federation_method_unwrapDefault(moduleWrapped))
  //   .then((module) => {
  //     console.log(module);
  //     console.log(typeof module);
  //     return module;
  //     //   setDynamicModule(module);
  //   });
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMRs
        </p>
        {/* <Suspense fallback={"loading"}>
          <DynWrapper />
        </Suspense> */}
        <Suspense>
          {__federation_method_getRemote("dyn", "./DynamicApp")
            .then((moduleWrapped) => {
              console.log(moduleWrapped);
              console.log(typeof moduleWrapped);
              __federation_method_unwrapDefault(moduleWrapped);
            })
            .then((module) => {
              console.log(module);
              console.log(typeof module);
              return module;
              //   setDynamicModule(module);
            })}
        </Suspense>

        {/* <Suspense>
          <DynApp />
        </Suspense> */}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <Suspense>
        <RegApp />
      </Suspense> */}
    </>
  );
}

export default App;
