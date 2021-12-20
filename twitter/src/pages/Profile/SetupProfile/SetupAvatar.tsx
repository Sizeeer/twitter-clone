import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ImageInterface } from "../../../hooks/useUploadImages";
import { selectCurrentUserData } from "../../../store/currentUser/selectors";
import { SetupActions } from "./SetupActions";
import { v4 as uuid } from "uuid";
import { UpdateUserData } from "../../../shared/types/userTypes";

const UserAvatar = styled(Avatar)`
  width: 130px;
  height: 130px;
  border: 4px solid #fff;
`;

const BackgroundImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 99;
  left: 15px;
  top: 50%;
`;

interface Props {
  onChangeImage: (name: string, data: string) => void;
  setDeletingState: any;
}

export const SetupAvatar = ({ onChangeImage, setDeletingState }: Props) => {
  const currentUserData = useSelector(selectCurrentUserData);
  const [avatar, setAvatar] = useState<ImageInterface | null>({
    src: currentUserData?.avatar || "",
    resultSrc: "",
    id: uuid(),
  });

  const deleteImage = useCallback(() => {
    setAvatar(null);
    setDeletingState((prev: any) => ({ ...prev, avatar: true }));
  }, []);

  useEffect(() => {
    if (avatar?.src) {
      onChangeImage("avatar", avatar?.src || "");
    }
  }, [avatar?.src]);

  return (
    <Wrapper>
      <BackgroundImageOverlay />
      <UserAvatar src={avatar?.src} />
      <Box position="absolute" zIndex="99">
        <SetupActions
          image={avatar}
          setImages={setAvatar}
          deleteImage={deleteImage}
        />
      </Box>
    </Wrapper>
  );
};
