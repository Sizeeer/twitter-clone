import Alert from "@material-ui/lab/Alert";
import React from "react";
import styled from "styled-components";

const Error = styled(Alert)`
  margin-top: 10px;
`;

interface Props {
  readonly isError: boolean;
}

export const ErrorMessage = ({ isError }: Props) => {
  return isError ? (
    <Error severity="error">
      Добавление твита не удалось <span>😔</span>
    </Error>
  ) : null;
};
