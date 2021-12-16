import Button, { ButtonProps } from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  height: 46px;
  font-weight: 700px;
  max-width: 230px;
`;

export const TweetButton = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
