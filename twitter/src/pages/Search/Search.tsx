import {
  Box,
  InputAdornment,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Loader } from "../../components/Loader";
import { TweetsList } from "../../components/TweetsList";
import useDebounce from "../../hooks/useDebounce";
import { useGetTopicsTweets } from "../../hooks/useGetTopicsTweets";
import { useModal } from "../../hooks/useModal";
import { selectCurrentUserData } from "../../store/currentUser/selectors";

const SearchTextField = withStyles((theme: Theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: 30,
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

    "& .MuiInputBase-input": {
      padding: "12px 14px 14px 5px",
    },
  },
}))(TextField);

export const Search = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const { topicsTweets, isLoading, refetch, getMore, hasTopicsTweets } =
    useGetTopicsTweets(debouncedSearchQuery);
  const currentUserData = useSelector(selectCurrentUserData);

  useEffect(() => {
    if (debouncedSearchQuery) {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box mt={2} pl={2} pr={2}>
      <Box mb={3}>
        <SearchTextField
          variant="outlined"
          placeholder="Поиск в Твиттере"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          fullWidth
          onClick={onOpen}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <TweetsList
        tweets={topicsTweets}
        isLoading={isLoading}
        hasTweets={hasTopicsTweets}
        getMoreTweets={getMore}
        userId={currentUserData!.userId}
      />
    </Box>
  );
};
