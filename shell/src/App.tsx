import React from "react";
import { FunctionComponent, Suspense, useEffect, useState } from "react";
// import DynWrapper from "./DynWrapper";

import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

function App() {
  const [count, setCount] = useState(0);

  // const DynApp = React.lazy(() => import("dyn/DynamicApp"));
  // const RegApp = React.lazy(() => import("reg/RegularApp"));
  const [DynamicRemote, setDynamicRemote] = useState<FunctionComponent>();
  const remotes = [
    {
      name: "dyn",
      url: "http://localhost:4202/assets/remoteEntry.js",
      component: "./DynamicApp",
    },
    {
      name: "reg",
      url: "http://localhost:4202/assets/remoteEntry.js",
      component: "./RegularApp",
    },
  ];
  useEffect(() => {
    // __federation_method_setRemote("dyn", {
    __federation_method_setRemote("reg", {
      url: () => Promise.resolve("http://localhost:4202/assets/remoteEntry.js"),
      format: "esm",
      from: "vite",
    });

    // Get the remote module "./DynamicApp"
    // __federation_method_getRemote("dyn", "./DynamicApp")
    __federation_method_getRemote("reg", "./RegularApp")
      .then((moduleWrapped) => __federation_method_unwrapDefault(moduleWrapped))
      .then((module) => {
        console.log(module);
        console.log(typeof module);
        setDynamicRemote(() => module); // the lambda is important
      });
  }, []);

  if (DynamicRemote) {
    return (
      <>
        <h1>Test dynamic remotes</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Suspense>
          <DynamicRemote />
        </Suspense>
        {/* <Suspense>
          <RegApp />
        </Suspense> */}
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
export default App;
