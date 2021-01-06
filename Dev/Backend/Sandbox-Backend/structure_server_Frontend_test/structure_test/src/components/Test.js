import React from "react";

const Test = (props) => {
  return (
    <li>
      <div>
        <div>{props.test.id}</div>
        <div>{props.test.name}</div>
        <div>{props.test.createdOn}</div>
      </div>
    </li>
  );
};

export default Test;
