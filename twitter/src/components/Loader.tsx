import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;

interface LoaderIconProps {
  fontSize: number;
}

const LoaderIcon = styled(CircularProgress)<LoaderIconProps>`
  width: ${({ fontSize }) => fontSize}px !important;
  height: ${({ fontSize }) => fontSize}px !important;
`;

interface Props {
  fontSize?: number;
}
export const Loader = ({ fontSize = 40 }: Props) => {
  return (
    <LoaderWrapper>
      <LoaderIcon fontSize={fontSize} color="primary" />
    </LoaderWrapper>
  );
};
