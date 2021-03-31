import * as React from "react";

type Props = {};

const Page: React.FC<Props> = ({}: Props) => {
  return <div>Page</div>;
};

export default React.memo(Page);
