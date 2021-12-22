import {
  Box,
  ClickAwayListener,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useDebounce from "../hooks/useDebounce";
import { useModal } from "../hooks/useModal";
import { useSearch } from "../hooks/useSearch";
import { Loader } from "./Loader";
import { UserAvatar } from "./Tweet/Tweet";

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

const Popover = styled.div`
  overflow-y: auto;
  display: flex;
  justify-content: center;
  z-index: 199;
  width: 100%;
  height: 300px;
  max-height: 300px;
  background-color: #fff;
  box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
  position: absolute;
  bottom: -300px;
  border-radius: 10px;

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

const StyledTypography = withStyles({
  root: {
    fontSize: 15,
  },
  h5: {
    fontWeight: 700,
  },
  body2: {
    fontWeight: 400,
  },
})(Typography);

const TopicContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transition: background-color 0.05s ease-in-out;
  padding: 20px;
  &:hover {
    background-color: rgb(245, 248, 250);
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: flex-start;
  transition: background-color 0.05s ease-in-out;
  padding: 20px;
  &:hover {
    background-color: rgb(245, 248, 250);
  }
`;

export const SearchBar = () => {
  const { isOpen, onOpen, onClose } = useModal();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const { searchData, isLoading, refetch } = useSearch(debouncedSearchQuery);

  useEffect(() => {
    if (debouncedSearchQuery) {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);

  return (
    <div style={{ position: "relative" }}>
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
      {isOpen && (
        <ClickAwayListener onClickAway={onClose}>
          <Popover onClick={(e) => e.stopPropagation()}>
            {isLoading ? (
              <Loader />
            ) : (
              <Box display="flex" flexDirection="column" width="100%">
                {searchData?.users.length === 0 &&
                  searchData?.topics.length === 0 && (
                    <Box display="flex" justifyContent="center" mt={2}>
                      <StyledTypography variant="body2">
                        Ничего не найдено:(
                      </StyledTypography>
                    </Box>
                  )}
                {Boolean(searchData) &&
                  searchData?.topics.map((topic) => (
                    <Link to={`/search/?q=${topic.title}`} key={topic.topicId}>
                      <TopicContainer>
                        <StyledTypography variant="h5">
                          {topic.title}
                        </StyledTypography>
                        <StyledTypography variant="body2">
                          {topic.count}
                        </StyledTypography>
                      </TopicContainer>
                    </Link>
                  ))}
                {Boolean(searchData) &&
                  searchData?.users.map((user) => (
                    <Link to={`/profile/${user.userId}`} key={user.userId}>
                      <UserContainer>
                        <UserAvatar src={user.avatar} />
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                        >
                          <StyledTypography variant="h5">
                            {user.name}
                          </StyledTypography>
                          <StyledTypography variant="h5">
                            @{user.login}
                          </StyledTypography>
                        </Box>
                      </UserContainer>
                    </Link>
                  ))}
              </Box>
            )}
          </Popover>
        </ClickAwayListener>
      )}
    </div>
  );
};
