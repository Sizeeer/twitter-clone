import styled from "styled-components";
import ListItemMUI from "@material-ui/core/ListItem";
import theme from "../../../theme";
import { grey } from "@material-ui/core/colors";

export const ListItem = styled(ListItemMUI)`
  background-color: #f7f9f9;
  cursor: pointer;
  transition: all 0.1s;
  & p {
    color: ${grey[500]};
    font-size: 14px;
  }
  & a {
    color: inherit;
    text-decoration: none;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  &:hover {
    background-color: rgb(235, 238, 240);
  }
  &:last-child {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
`;

export const OpenAll = styled(ListItem)`
  & span {
    font-weight: 400;
    color: ${theme.palette.primary.main};
    font-size: 15px;
  }

  & p {
    font-size: 13px;
  }
`;
