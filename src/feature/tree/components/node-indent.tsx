import { Fragment } from "react";

export default function NodeIndent({ depth = 1 }: { depth?: number }) {
  return (
    <Fragment>
      {Array.from({ length: depth }, (_, index) => (
        <span key={index} className="inline-block w-6 h-6"></span>
      ))}
    </Fragment>
  );
}
