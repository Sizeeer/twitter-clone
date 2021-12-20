import { Box, Button, TextField, Theme, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { UpdateUserData } from "../../../shared/types/userTypes";
export const MAX_BIO_LENGTH = 160;
export const MAX_NAME_LENGTH = 50;
export const MAX_LOCATION_LENGTH = 30;
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

interface FormInput {
  name: string;
  description: string;
  location: string;
}

const StyledTextField = withStyles((theme: Theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: 10,
      backgroundColor: "rgb(235,238,240)",
      padding: 0,
      paddingLeft: 15,

      "&.Mui-focused": {
        backgroundColor: "#fff",
        "& fieldset": {
          borderWidth: 1,
          borderColor: theme.palette.primary.main,
        },
        "& svg path": {
          fill: theme.palette.primary.main,
        },
      },
      "&:hover": {
        "& fieldset": {
          borderColor: "transparent",
        },
      },
      "& fieldset": {
        borderWidth: 1,
        borderColor: "transparent",
      },
    },
  },
}))(TextField);

interface Props {
  setSetupData: React.Dispatch<React.SetStateAction<UpdateUserData>>;
}

export const SetupInfo = ({ setSetupData }: Props) => {
  const { control, getValues, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
  });

  const [nameWatch, bioWatch, locationWatch] = watch([
    "name",
    "description",
    "location",
  ]);

  useEffect(() => {
    if (nameWatch) {
      setValue("name", nameWatch.slice(0, MAX_NAME_LENGTH));
      setSetupData((prev) => ({ ...prev, name: nameWatch }));
    }
  }, [nameWatch, setValue, setSetupData]);

  useEffect(() => {
    if (bioWatch) {
      setValue("description", bioWatch.slice(0, MAX_BIO_LENGTH));
      setSetupData((prev) => ({ ...prev, description: bioWatch }));
    }
  }, [bioWatch, setValue, setSetupData]);

  useEffect(() => {
    if (locationWatch) {
      setValue("location", locationWatch.slice(0, MAX_LOCATION_LENGTH));
      setSetupData((prev) => ({ ...prev, location: locationWatch }));
    }
  }, [locationWatch, setValue, setSetupData]);

  return (
    <>
      <StyledTypography variant="h5">Ваше имя</StyledTypography>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <StyledTypography variant="subtitle2" color="textSecondary">
              {getValues("name").length}/{MAX_NAME_LENGTH}
            </StyledTypography>
            <StyledTextField
              variant="outlined"
              placeholder=""
              label="Имя"
              fullWidth
              {...field}
            />
          </Box>
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box mt={2}>
            <StyledTypography variant="h5">Опишите себя</StyledTypography>{" "}
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <StyledTypography variant="subtitle2" color="textSecondary">
                {getValues("description").length}/{MAX_BIO_LENGTH}
              </StyledTypography>
              <StyledTextField
                variant="outlined"
                placeholder=""
                label="Bio"
                fullWidth
                {...field}
              />
            </Box>
          </Box>
        )}
      />

      <Controller
        name="location"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box mt={2}>
            <StyledTypography variant="h5">Где вы живете?</StyledTypography>{" "}
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <StyledTypography variant="subtitle2" color="textSecondary">
                {getValues("location").length}/{MAX_LOCATION_LENGTH}
              </StyledTypography>
              <StyledTextField
                variant="outlined"
                placeholder=""
                label="Локация"
                fullWidth
                {...field}
              />
            </Box>
          </Box>
        )}
      />
    </>
  );
};
