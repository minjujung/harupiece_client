import React from "react";
import styled from "styled-components";

const TagContainer = ({ children }) => {
  return <TagFrame>{children}</TagFrame>;
};

TagContainer.defaultProps = {
  children: null,
};

export default TagContainer;

const TagFrame = styled.div`
  display: flex;
  margin: 2.22vh 0 1.39vh 1.04vw;
  ${({ theme }) => theme.device.mobileLg} {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1.22vh 0 0 4.44vw;
  }
`;
