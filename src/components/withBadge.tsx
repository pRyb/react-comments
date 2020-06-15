import React from "react";
import styled from "styled-components";

import COLORS from "../utils/colors";

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const Badge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  background-color: ${COLORS.distinctive};
  border-radius: 50%;
  text-align: center;
`;

const BadgeValue = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface WithBadgeProps {
  value?: number;
}

const withBadge = <P extends object>(Component: React.ComponentType<P>) => {
  return class WithBadge extends React.Component<P & WithBadgeProps> {
    render() {
      const { value } = this.props;
      return (
        <Wrapper>
          <Component {...this.props} />
          {value !== 0 && (
            <Badge>
              <BadgeValue>{value}</BadgeValue>
            </Badge>
          )}
        </Wrapper>
      );
    }
  };
};

export default withBadge;
