import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { me } from "../store/currentUser/currentUserSlice";
import { selectCurrentUserData } from "./../store/currentUser/selectors";

interface AuthReturned {
  isAuthenticated: boolean;
}

export const useAuth = (): AuthReturned => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(selectCurrentUserData);

  return {
    isAuthenticated: !!currentUserData?.userId,
  };
};
