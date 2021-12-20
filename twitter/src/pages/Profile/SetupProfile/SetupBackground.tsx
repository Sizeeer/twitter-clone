import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ImageInterface } from "../../../hooks/useUploadImages";
import { v4 as uuid } from "uuid";
import { selectCurrentUserData } from "../../../store/currentUser/selectors";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { SetupActions } from "./SetupActions";

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 1;
`;

const BackgroundImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

interface Props {
  onChangeImage: (name: string, data: string) => void;
  setDeletingState: any;
}

export const SetupBackground = ({ onChangeImage, setDeletingState }: Props) => {
  const currentUserData = useSelector(selectCurrentUserData);
  const [backgroundImage, setBackgroundImage] = useState<ImageInterface | null>(
    {
      src: currentUserData?.backgroundImage || "",
      resultSrc: "",
      id: uuid(),
    }
  );

  const deleteImage = useCallback(() => {
    setBackgroundImage(null);
    setDeletingState((prev: any) => ({ ...prev, backgroundImage: true }));
  }, []);

  useEffect(() => {
    if (backgroundImage?.src) {
      onChangeImage("backgroundImage", backgroundImage?.src || "");
    }
  }, [backgroundImage?.src]);

  return (
    <>
      <BackgroundImageOverlay />

      {Boolean(backgroundImage?.src) ? (
        <BackgroundImage src={backgroundImage?.src} />
      ) : (
        <Paper
          style={{
            backgroundColor: "#CFD9DE",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          square
        ></Paper>
      )}
      <SetupActions
        image={backgroundImage}
        setImages={setBackgroundImage}
        deleteImage={deleteImage}
      />
    </>
  );
};
