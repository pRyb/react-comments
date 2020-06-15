import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { thunkChooseComponent } from "../store/thunks";

import COLORS from "../utils/colors";

import { IState } from "../store/types";

const StyledTile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

const Button = styled.button`
  background-color: ${COLORS.dark};
  padding: 5px 10px;
  border: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: ${COLORS.light};
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.dark}90;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  padding: 10px 30px;
`;

const TextField = styled.span`
  text-align: center;
`;

const CheckSign = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${COLORS.distinctive};
`;

interface TileProps {
  id: number;
  name: string;
  email: string;
  body: string;
  thunkChooseComponent: (id: number) => void;
  chosen: boolean;
}

const Tile: React.FunctionComponent<TileProps> = ({
  id,
  name,
  email,
  body,
  thunkChooseComponent,
  chosen,
}): JSX.Element => {
  const handleChosenCommentButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    thunkChooseComponent(id);
  };
  return (
    <StyledTile>
      <TextWrapper>
        <TextField>{email}</TextField>
        <TextField>{name}</TextField>
        <TextField>{body.substring(0, 20)}</TextField>
      </TextWrapper>
      {!chosen && (
        <Button onClick={handleChosenCommentButton}>Dodaj do wybranych</Button>
      )}
      {chosen && <CheckSign>&#10004;</CheckSign>}
    </StyledTile>
  );
};

const mapStateToProps = ({ comments }: IState) => ({
  comments,
});

const mapDispatchToProps = {
  thunkChooseComponent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
