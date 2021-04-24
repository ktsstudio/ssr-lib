import * as React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Main: React.FC<Props> = ({}: Props) => {
  console.log("main");

  return (
    <div>
      <p>Main</p>
      <Link to="/about">About</Link>
    </div>
  );
};

export default React.memo(Main);
