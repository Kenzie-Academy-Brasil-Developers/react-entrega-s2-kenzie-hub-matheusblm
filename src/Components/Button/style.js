import styled from "styled-components";

export const Container = styled.button`
  background-color: ${(props) => (props.whiteSchema ? "#f5f5f5" : "#111D4A")};
  color: ${(props) => (props.whiteSchema ? "#111D4A" : "#f5f5f5")};
  height: 45px;
  border-radius: 8px;
  border-style: hidden;
  font-family: "Roboto mono", monospace;
  margin-top: 16px;
  width: 100%;
  transition: 0.5s;
  :hover {
    border: 2px solid;
    border-color: ${(props) => (props.whiteSchema ? "#111D4A" : "#f5f5f5")};
  }
`;
