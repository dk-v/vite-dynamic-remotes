import {
  useState,
  FunctionComponent,
  useEffect,
  ReactFragment,
  ReactNode,
  createElement,
} from "react";
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

const DynWrapper = () => {
  const [DynamicRemote, setDynamicRemote] = useState<FunctionComponent>();
  useEffect(() => {
    __federation_method_setRemote("dyn", {
      url: () => Promise.resolve("http://localhost:4201/assets/remoteEntry.js"),
      format: "esm",
      from: "vite",
    });

    // Get the remote module "./DynamicApp"
    __federation_method_getRemote("dyn", "./DynamicApp").then(
      (moduleWrapped) => {
        console.log(moduleWrapped);
        console.log(typeof moduleWrapped);
        __federation_method_unwrapDefault(moduleWrapped);
        setDynamicRemote(moduleWrapped.default);
      }
    );
    // .then((module) => {
    //   console.log(module);
    //   console.log(typeof module);
    //   module;
    //   setDynamicModule(module);
    // });
  }, []);

  if (DynamicRemote) {
    return (
      <div>
        <DynamicRemote />
      </div>
    );
    // const DynamicComponent = mod;
    // console.log(DynamicModule);
    // return createElement(Test);
  } else {
    // You can return a loading indicator or handle loading state as needed
    return <div>Loading...</div>;
  }
};

export default DynWrapper;
