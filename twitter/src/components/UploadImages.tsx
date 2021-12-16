import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { ImageInterface } from "./TweetForm/TweetForm";

const Label = styled.label`
  position: relative;
  display: block;
`;

const Input = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

interface Props {
  setImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
  disabled: boolean;
}

export const UploadImages = ({ setImages, disabled }: Props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(event.target.files![0]);

    setImages((prev) => [...prev, { src: file, resultSrc: null, id: uuid() }]);
    event.target.value = "";
  };

  return (
    <Label htmlFor="upload_file">
      <IconButton color="primary" disabled={disabled}>
        <Input
          id="upload_file"
          type="file"
          disabled={disabled}
          onChange={onChangeHandler}
        />
        <ImageOutlinedIcon />
      </IconButton>
    </Label>
  );
};
