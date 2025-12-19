import { AppDispatch } from "../../store";
import { apiSlice } from "@/redux/services/apiSlice";
import { setAuth, finishInitialLoad, logout } from "./authSlice";

export const initAuth = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    // 1) Try to load profile directly (cheap check). If access cookie exists and valid, returns user.
    const profileResp = await dispatch(
      apiSlice.endpoints.getProfile.initiate(undefined)
    );

    if ("data" in profileResp && profileResp.data) {
      dispatch(setAuth({
        ...profileResp.data,
        role: profileResp.data.role ?? null,
      }));
      dispatch(finishInitialLoad());
      // unsubscribe from cache subscription created by initiate
      // (RTKQ returns a promise-like object that includes an `unsubscribe` method)
      ;(profileResp as unknown as { unsubscribe?: () => void }).unsubscribe?.();
      return;
    }

    // 2) If profile returned 401, baseQueryWithReauth will try one refresh (mutex-protected).
    // We re-run the profile to let that refresh attempt and then re-check.
    const profileRetry = await dispatch(
      apiSlice.endpoints.getProfile.initiate(undefined)
    );

    if ("data" in profileRetry && profileRetry.data) {
      dispatch(
        setAuth({
          ...profileRetry.data,
          role: profileRetry.data.role ?? null,
        })
      );
      dispatch(finishInitialLoad());
      ;(profileRetry as unknown as { unsubscribe?: () => void }).unsubscribe?.();
      return;
    }

    // No user — mark initial load finished (unauthenticated)
    dispatch(finishInitialLoad());
    dispatch(logout());

  } catch (err) {
    console.error("Unexpected error during auth init", err);
    dispatch(finishInitialLoad());
  }
};
