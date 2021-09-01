import styled from "@emotion/styled";
import React, { ReactElement } from "react";

const Row = styled.div`
  /* background: #abc; */
  .row {
    display: flex;
    background: #abc;
    overflow-y: auto;
    overflow-x: hidden;
    width: 250px;
    max-height: 700px;
    transform: rotate(-90deg) translateY(-250px);
    transform-origin: right top;

    & > div {
      padding: 5px;
      background: #cab;
      transform: rotate(90deg);
      transform-origin: right top;
    }
  }

  .square {
    padding: 250px 0 0 0;
    & > div {
      width: 250px;
      height: 250px;
    }
  }
`;

type Props = {
  children: JSX.Element;
};
export default function ScrollRow({ children }: Props): ReactElement {
  return <Row className="row square">{children}</Row>;
}
