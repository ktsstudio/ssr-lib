import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type Props = {};

const About: React.FC<Props> = ({}: Props) => {
  useEffect(() => {
    const data = (window as any).__CONTEXT__;
    console.log(data);
  }, []);

  return (
    <div>
      <p>About</p>
      <Link to="/">Main</Link>
    </div>
  );
};

export default React.memo(About);
