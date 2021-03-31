import * as React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Main: React.FC<Props> = ({}: Props) => {
  return (
    <div>
      <p>Main</p>
      <Link to="/about">About</Link>
    </div>
  );
};

export default React.memo(Main);
