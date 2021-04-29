import * as React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

type Props = {};

const Main: React.FC<Props> = ({}: Props) => {
  const location = useLocation();

  console.log("main", location, useParams());

  return (
    <div>
      <p>Main</p>
      <Link to="/about">About</Link>
    </div>
  );
};

export default React.memo(Main);
