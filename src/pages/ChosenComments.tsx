import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { thunkCommentRemove } from "../store/thunks";

import { IState, IComment } from "../store/types";

import COLORS from "../utils/colors";

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  display: flex;
  margin: 10px;
  box-sizing: border-box;

  &:hover {
    border-radius: 6px;
    background-color: ${COLORS.light};
  }
`;

const StyledListItemText = styled.span`
  flex-grow: 1;
  margin: 10px;
`;

const StyledListItemButton = styled.button`
  border: 0;
  margin: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-sizing: border-box;
  color: ${COLORS.distinctive};
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: ${COLORS.red};
  }
`;

const EmptyCommentsMessage = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  comments?: IComment[];
  thunkCommentRemove: (commentId: number) => void;
};

const ChosenComponents = ({
  comments,
  thunkCommentRemove,
}: Props): JSX.Element => {
  const renderChosenComments = () => {
    if (!comments) return;
    const chosenComments = comments
      .filter(({ chosen }) => chosen)
      .map(({ id, body }) => {
        return (
          <StyledListItem key={id}>
            <StyledListItemText>{body}</StyledListItemText>
            <StyledListItemButton
              onClick={(event) => {
                event.preventDefault();
                id && id !== 0 && thunkCommentRemove(id);
              }}
            >
              Usuń
            </StyledListItemButton>
          </StyledListItem>
        );
      });

    return !!chosenComments.length ? (
      <StyledList>{chosenComments}</StyledList>
    ) : (
      <EmptyCommentsMessage>Brak wybranych komentarzy</EmptyCommentsMessage>
    );
  };
  return <>{renderChosenComments()}</>;
};

const mapStateToProps = ({ comments }: IState) => ({
  comments,
});

const mapDispatchToProps = { thunkCommentRemove };

export default connect(mapStateToProps, mapDispatchToProps)(ChosenComponents);
