import React from "react";
import Cropper from "react-cropper";
import { Button } from "@material-ui/core";

import "cropperjs/dist/cropper.css";

interface CropperImagesInterface {
  src: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  closeCropEditor: () => void;
}

export const CropperImages: React.FC<CropperImagesInterface> = ({
  src,
  setImageSrc,
  closeCropEditor,
}) => {
  const [cropper, setCropper] = React.useState<any>();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImageSrc(cropper.getCroppedCanvas().toDataURL());
      closeCropEditor();
    }
  };

  React.useEffect(() => {
    return () => {
      if (typeof cropper !== "undefined") {
        cropper.destroy();
      }
    };
  }, [cropper]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Cropper
        style={{ height: 400, width: "100%" }}
        src={src}
        viewMode={3}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        aspectRatio={1}
        background={false}
        responsive={true}
        autoCropArea={1}
        autoCrop={true}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={getCropData}
      >
        Изменить
      </Button>
    </div>
  );
};
