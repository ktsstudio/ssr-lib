import * as React from "react";
import loadable from "@loadable/component";

export const OtherComponent = loadable(() => import("./Page"));

const App: React.FC = () => {
  return (
    <div>
      <p>HELLO</p>
      <OtherComponent />
    </div>
  );
};

export default React.memo(App);
