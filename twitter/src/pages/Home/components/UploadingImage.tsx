import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

import { CropperImages } from "../../../core/CropperImages";
import { DialogBox } from "../../../core/DialogBox";
import { useHomePageClasses } from "../theme/theme";

interface UploadingImageInterface {
  src: string;
  deleteImage: (src: string) => void;
  addResultSrc: (src: string, resultSrc: string) => void;
}

export const UploadingImage: React.FC<UploadingImageInterface> = ({
  src,
  deleteImage,
  addResultSrc,
}) => {
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

  const remove = (): void => {
    deleteImage(src);
  };

  React.useEffect(() => {
    addResultSrc(src, imageSrc);
  }, [imageSrc, addResultSrc, src]);

  return (
    <>
      <div className={classes.uploadImageWrapper}>
        <CloseIcon
          style={{
            fontSize: 30,
            color: "#fff",
            position: "absolute",
            left: 10,
            top: 10,
            padding: 5,
            backgroundColor: "#1DA1F2",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={remove}
        />
        <div
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
        />
        <Button
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            height: 30,
          }}
          color="primary"
          variant="contained"
          onClick={onOpenCropEditor}
        >
          Изменить
        </Button>
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
