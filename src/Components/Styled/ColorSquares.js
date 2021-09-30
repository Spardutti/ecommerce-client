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

  @media (max-width: 520px) {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.1rem;
  }
`;
