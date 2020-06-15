import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  position: relative;
  flex-grow: 1;
  overflow: auto;
`;

const Main: React.FunctionComponent = (props): JSX.Element => {
  return <StyledMain>{props.children}</StyledMain>;
};

export default Main;
