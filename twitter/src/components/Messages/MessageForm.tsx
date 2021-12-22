import { Box, IconButton, InputBase } from "@material-ui/core";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

const StyledTextField = styled(InputBase)`
  position: absolute;
  bottom: 0;
  width: 100%;
  right: 0;
  left: 0;
  background: #fff;
  padding-top: 24px;
  padding-bottom: 28px;
  padding-left: 64px;
`;

const SendButton = styled(IconButton)`
  padding: 5px;
`;

const StyledSendIcon = styled(SendRoundedIcon)`
  color: #1d9bf0;
`;

interface Props {
  readonly onSubmitProps: (text: string) => void;
}

type FormInputsType = {
  text: string;
};

export const MessageForm = ({ onSubmitProps }: Props) => {
  const { reset, handleSubmit, register } = useForm<FormInputsType>();
  const onSubmit = useCallback(
    (data: { text: string }) => {
      console.log(data);

      onSubmitProps(data.text);
      reset();
    },
    [onSubmitProps, reset]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
        {...register("text")}
        placeholder="Введите сообщение"
        defaultValue=""
        endAdornment={
          <Box pr={6}>
            <SendButton size="small" type="submit">
              <StyledSendIcon />
            </SendButton>
          </Box>
        }
        required
      />
    </form>
  );
};
