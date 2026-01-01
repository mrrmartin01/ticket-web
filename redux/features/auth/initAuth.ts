import { AppDispatch } from "@/redux/store";
import { apiSlice } from "@/redux/services/apiSlice";
import { setUser, clearUser } from "./authSlice";

export const initAuth = () => async (dispatch: AppDispatch) => {
  try {
    const result = await dispatch(
      apiSlice.endpoints.getProfile.initiate(undefined, {
        forceRefetch: true,
      })
    );

    if ("data" in result && result.data) {
      dispatch(setUser(result.data));
    } else {
      dispatch(clearUser());
    }

    if ("unsubscribe" in result && typeof result.unsubscribe === "function") {
      result.unsubscribe();
    }
  } catch (err) {
    console.error("Auth bootstrap failed", err);
    dispatch(clearUser());
  }
};
