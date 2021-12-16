import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

export const ListTitle = styled(Paper)`
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  padding: 12px 16px;
  background-color: #f7f9f9;
  & h6 {
    font-weight: 800;
    font-size: 19px;
  }
`;
