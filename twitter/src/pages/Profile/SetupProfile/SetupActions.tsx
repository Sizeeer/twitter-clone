import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import React, { SetStateAction } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { ImageInterface } from "../../../hooks/useUploadImages";

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 50%;
  margin: 0;
  z-index: 3;
  color: #fff;
`;

const StyledUploadButton = styled(IconButton)`
  color: #fff;
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
`;

const StyledCloseButton = styled(IconButton)`
  color: #fff;
  margin-left: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
`;

interface Props {
  image: ImageInterface | null;
  setImages: React.Dispatch<React.SetStateAction<ImageInterface | null>>;
  deleteImage: () => void;
}

export const SetupActions = ({ image, setImages, deleteImage }: Props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(event.target.files![0]);

    setImages({ src: file, resultSrc: null, id: uuid() });
    event.target.value = "";
  };
  return (
    <ActionsWrapper>
      {/* @ts-ignore */}
      <StyledUploadButton color="primary" component="label">
        <input
          id="setup_upload"
          type="file"
          onChange={onChangeHandler}
          hidden
        />{" "}
        <ImageOutlinedIcon />
      </StyledUploadButton>

      {Boolean(image?.src) && (
        <StyledCloseButton color="primary" onClick={deleteImage}>
          <CloseIcon />
        </StyledCloseButton>
      )}
    </ActionsWrapper>
  );
};
