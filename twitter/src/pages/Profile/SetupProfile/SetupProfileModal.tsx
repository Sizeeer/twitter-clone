import { Box, Button, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { UserApi } from "../../../api/userApi";

import { DialogBox } from "../../../components/DialogBox";
import { useUpdateProfile } from "../../../hooks/useUpdateProfile";
import { ImageInterface } from "../../../hooks/useUploadImages";
import { UpdateUserData } from "../../../shared/types/userTypes";
import { setCurrentUser } from "../../../store/currentUser/currentUserSlice";
import { selectCurrentUserData } from "../../../store/currentUser/selectors";
import { axios } from "../../../utils/axios";
import { SetupActions } from "./SetupActions";
import { SetupAvatar } from "./SetupAvatar";
import { SetupBackground } from "./SetupBackground";
import { SetupInfo } from "./SetupInfo";

const DialogWrapper = styled.div`
  width: 600px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 48px;
`;

const StyledTypography = withStyles({
  h5: {
    fontSize: 23,
    fontWeight: 700,
    color: "#0f1419",
    lineHeight: "28px",
  },
  subtitle1: {
    fontSize: 15,
    fontWeight: 400,
  },
})(Typography);

const StyledButton = withStyles({
  contained: {
    color: "#fff",
  },
})(Button);

interface Props {
  open: boolean;
  onClose: () => void;
  currentBackgroundImage?: ImageInterface;
}

export const SetupProfileModal = ({ open, onClose }: Props) => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(selectCurrentUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [setupData, setSetupData] = useState<UpdateUserData>({
    name: "",
    description: "",
    location: "",
    avatar: "",
    backgroundImage: "",
  });

  const [deletingState, setDeletingState] = useState({
    avatar: false,
    backgroundImage: false,
  });
  const { updateProfile } = useUpdateProfile();

  const onChangeImage = (name: string, data: string) => {
    setSetupData((prev) => ({ ...prev, [name]: data }));
  };

  const onSave = async () => {
    try {
      setIsLoading(true);
      let imagesToSave = [];
      if (!deletingState.avatar && !deletingState.backgroundImage) {
        if (setupData.avatar) {
          imagesToSave.push(setupData.avatar);
        }
        if (setupData.backgroundImage) {
          imagesToSave.push(setupData.backgroundImage);
        }
      }

      let formData = new FormData();
      for (let i = 0; i < imagesToSave.length; i++) {
        const src = imagesToSave[i];
        let blobFile = await fetch(src).then((r) => r.blob());
        formData.append("avatar", blobFile);
      }

      const [resultSrcAvatar, resultSrcBackground] = await axios
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => data.data);

      const updateData: UpdateUserData = {
        name: setupData.name || currentUserData?.name,
        description: setupData.description || currentUserData?.description,
        location: setupData.location || currentUserData?.location,
        avatar: deletingState.avatar
          ? null
          : resultSrcAvatar || currentUserData?.avatar,
        backgroundImage: deletingState.backgroundImage
          ? null
          : resultSrcBackground || currentUserData?.backgroundImage,
      };

      await updateProfile(updateData);
      onClose();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogBox title="Редактирование профиля" open={open} onClose={onClose}>
      <DialogWrapper>
        <Box mt={1} mb={2}>
          <StyledTypography variant="h5">
            Загрузите свой аватар и шапку профиля
          </StyledTypography>
        </Box>
        <Box>
          <StyledTypography variant="subtitle1" color="textSecondary">
            Это увидят люди, которые посетят ваш профиль.
          </StyledTypography>
        </Box>
        <Box
          mt={8}
          mb={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          height="150px"
        >
          <SetupBackground
            onChangeImage={onChangeImage}
            setDeletingState={setDeletingState}
          />
          <SetupAvatar
            onChangeImage={onChangeImage}
            setDeletingState={setDeletingState}
          />
        </Box>
        <SetupInfo setSetupData={setSetupData} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="space-between"
          width="100%"
          mt={3}
        >
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSave}
            disabled={isLoading}
          >
            Сохранить
          </StyledButton>
        </Box>
      </DialogWrapper>
    </DialogBox>
  );
};
