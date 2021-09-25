import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  animation: ${rotate} 1s linear infinite;
  border-top: 2px solid gray;
  border-right: 2px solid gray;
  border-bottom: 2px solid gray;
  border-left: 4px solid black;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: auto;
`;

export default Spinner;
