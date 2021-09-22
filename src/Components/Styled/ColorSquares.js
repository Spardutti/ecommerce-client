import styled from "styled-components";

export const ColorSquares = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  margin: 2px;
`;
