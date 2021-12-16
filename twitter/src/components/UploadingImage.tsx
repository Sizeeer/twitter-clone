import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import React, { memo, useCallback, useEffect } from "react";

import { CropperImages } from "./CropperImages";
import { DialogBox } from "./DialogBox";
import { useHomePageClasses } from "../pages/Home/theme/theme";
import styled from "styled-components";
import theme from "../theme";

const StyledCloseIcon = styled(CloseIcon)`
  font-size: 30;
  color: #fff;
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 5px;
  background-color: ${theme.palette.primary.main};
  border-radius: 50%;
  cursor: pointer;
`;

interface BackgroundWithImageProps {
  src: string;
}

const BackgroundWithImage = styled.div<BackgroundWithImageProps>`
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const ChangeButton = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 30px;
`;

interface UploadingImageInterface {
  src: string;
  deleteImage: (src: string) => void;
  addResultSrc: (src: string, resultSrc: string) => void;
}

export const UploadingImage = ({
  src,
  deleteImage,
  addResultSrc,
}: UploadingImageInterface) => {
  const classes = useHomePageClasses();

  const [visibleCropEditor, setVisibleCropEditor] =
    React.useState<boolean>(false);
  const [imageSrc, setImageSrc] = React.useState<string>(src);

  const onOpenCropEditor = (): void => {
    setVisibleCropEditor(true);
  };

  const onCloseCropEditor = (): void => {
    setVisibleCropEditor(false);
  };

  const remove = useCallback((): void => {
    deleteImage(src);
  }, [src, deleteImage]);

  useEffect(() => {
    addResultSrc(src, imageSrc);
  }, [imageSrc, addResultSrc, src]);

  return (
    <>
      <div className={classes.uploadImageWrapper}>
        <StyledCloseIcon onClick={remove} />
        <BackgroundWithImage src={imageSrc} />
        <ChangeButton
          color="primary"
          variant="contained"
          onClick={onOpenCropEditor}
        >
          Изменить
        </ChangeButton>
      </div>
      <DialogBox
        title="Редактировать фото"
        open={visibleCropEditor}
        onClose={onCloseCropEditor}
      >
        {visibleCropEditor && (
          <CropperImages
            src={src}
            setImageSrc={setImageSrc}
            closeCropEditor={onCloseCropEditor}
          />
        )}
      </DialogBox>
    </>
  );
};
