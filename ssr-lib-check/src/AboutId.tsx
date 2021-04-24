import * as React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

type Props = { pageData: any };

const About: React.FC<Props> = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  console.log("about", props.pageData);

  return (
    <div>
      <p>About with param {id}</p>
      <Link to="/about">About</Link>
    </div>
  );
};

(About as any).loadData = async () => {
  const { data } = await axios.get("https://api.github.com/users/NapalmDeath");

  return data;
};

export default React.memo(About);
