import React, { useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { IState } from "../store/types";

import COLORS from "../utils/colors";

import WithBadge from "./withBadge";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: ${COLORS.dark};
  color: ${COLORS.light};
`;

const Navbar = styled.nav``;

const StyledLink = styled(Link)`
  display: inline-block;
  vertical-align: top;
  padding: 0 30px;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  line-height: 70px;
  background-color: transparent;
  color: ${COLORS.light};
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  :hover {
    background-color: ${COLORS.blue};
  }

  &.active {
    background-color: ${COLORS.blue};
  }
`;

const StyledHeading = styled.h2`
  position: relative;
  left: 20px;
`;

const LinkWithBadge = WithBadge(StyledLink);

const CollapsibleWrapper = styled.div`
  position: relative;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CollapsibleButton = styled.button`
  position: relative;
  padding: 0;
  border: 0;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  right: 10px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.light}80;
  }
`;

const CollapsibleContent = styled.div`
  position: absolute;
  display: none;
  z-index: 1;
  left: -200px;
  overflow: hidden;
  border-left: 2px solid ${COLORS.light};
  border-bottom: 2px solid ${COLORS.light};
  background-color: ${COLORS.dark};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

interface HeaderProps {
  numberOfChosenComments?: number;
}

const Header: React.FunctionComponent<HeaderProps> = (props): JSX.Element => {
  const { numberOfChosenComments } = props;
  const location = useLocation();
  const menuContent = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (!menuContent || !menuContent.current) return;

    const content: HTMLDivElement = menuContent.current;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  };

  const links: JSX.Element = (
    <>
      {location && location.pathname !== "/" && (
        <StyledLink to="/">Strona główna</StyledLink>
      )}
      <StyledLink to="/create-comment">Dodaj komentarz</StyledLink>
      <LinkWithBadge to="/chosen-comments" value={numberOfChosenComments}>
        Wybrane komentarze
      </LinkWithBadge>
    </>
  );

  return (
    <StyledHeader>
      <StyledHeading>Komentarze</StyledHeading>
      <Navbar>
        <ButtonsWrapper>{links}</ButtonsWrapper>
        <CollapsibleWrapper>
          <CollapsibleButton onClick={toggleMenu}>&#9776;</CollapsibleButton>
          <CollapsibleContent ref={menuContent}>{links}</CollapsibleContent>
        </CollapsibleWrapper>
      </Navbar>
    </StyledHeader>
  );
};

const mapStateToProps = ({ numberOfChosenComments }: IState) => ({
  numberOfChosenComments,
});

export default connect(mapStateToProps, null)(Header);
