import { useState, FunctionComponent } from "react";
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

const DynWrapper = () => {
  //   const [dynamicModule, setDynamicModule] = useState<FunctionComponent>();
  //   useEffect(() => {
  __federation_method_setRemote("dyn", {
    url: () => Promise.resolve("http://localhost:4201/assets/remoteEntry.js"),
    format: "esm",
    from: "vite",
  });

  // Get the remote module "./DynamicApp"
  const Mod = __federation_method_getRemote("dyn", "./DynamicApp")
    .then((moduleWrapped) => __federation_method_unwrapDefault(moduleWrapped))
    .then((module) => {
      console.log(module);
      console.log(typeof module);
      return module;
      //   setDynamicModule(module);
    });
  //   }, []);

  if (Mod) {
    // const DynamicComponent = mod;
    return <Mod />;
  } else {
    // You can return a loading indicator or handle loading state as needed
    return <div>Loading...</div>;
  }
};

export default DynWrapper;
