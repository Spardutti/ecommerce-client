import styled from "styled-components";

export const ColorSquares = styled.div`
  background-color: ${(props) => props.color};
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin: 2px;

  &:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;
