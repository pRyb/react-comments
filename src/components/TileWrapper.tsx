import React from "react";
import styled from "styled-components";

import COLORS from "../utils/colors";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${COLORS.light};
`;

const TileWrapper: React.FunctionComponent = (props): JSX.Element => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default TileWrapper;
