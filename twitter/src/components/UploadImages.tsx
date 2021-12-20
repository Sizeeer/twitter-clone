import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import React from "react";
import { v4 as uuid } from "uuid";

import { ImageInterface } from "../hooks/useUploadImages";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>;
  disabled: boolean;
  style?: React.CSSProperties;
}

export const UploadImages = ({ setImages, disabled, ...props }: Props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(event.target.files![0]);

    setImages((prev) => [...prev, { src: file, resultSrc: null, id: uuid() }]);
    event.target.value = "";
  };

  return (
    <IconButton
      component="label"
      color="primary"
      disabled={disabled}
      {...props}
    >
      <input id="upload_file" type="file" onChange={onChangeHandler} hidden />
      <ImageOutlinedIcon />
    </IconButton>
  );
};
