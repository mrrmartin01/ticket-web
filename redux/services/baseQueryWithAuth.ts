import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { logout, setAuth, finishInitialLoad } from "../features/auth/authSlice";
import { UserProfile } from "@/types/auth";

const mutex = new Mutex();
let lastFailedRefreshAt = 0; // throttle: timestamp of last failed refresh
const REFRESH_FAIL_THROTTLE_MS = 5_000; // avoid retrying refresh more than once every 5s on failure

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState: _getState }) => {
    // We rely on httpOnly cookie for auth; optional: if you also store access token in state,
    // you can attach Authorization header here. `_getState` is intentionally unused.
    void _getState;
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if another refresh is in progress
  await mutex.waitForUnlock();

  // Fire the original request
  let result = await baseQuery(args, api, extraOptions);

  // If not a 401, return immediately
  if (!(result.error && result.error.status === 401)) {
    return result;
  }

  // If we got 401, avoid storming refresh calls by using mutex
  // If refresh had recently failed, short-circuit to logout to avoid hammering
  const now = Date.now();
  if (now - lastFailedRefreshAt < REFRESH_FAIL_THROTTLE_MS) {
    api.dispatch(logout());
    return result;
  }

  if (!mutex.isLocked()) {
    const release = await mutex.acquire();
    try {
      // Attempt refresh
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST", credentials: "include" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // refresh endpoint sets new access cookie (httpOnly) on server
        // Now rehydrate minimal user info if server returns none — try profile call
        try {
          const profile = await baseQuery(
            { url: "/users/profile", method: "GET", credentials: "include" },
            api,
            extraOptions
          );

          if (profile.data && typeof profile.data === "object" && "id" in profile.data) {
            // Cast to the known user shape and map into the auth slice user shape
            const user = profile.data as UserProfile;
            const userPayload = {
              id: user.id ?? null,
              email: user.email ?? null,
              firstName: user.firstName ?? null,
              lastName: user.lastName ?? null,
              role: user.role ?? null,
            };

            api.dispatch(setAuth(userPayload));
            api.dispatch(finishInitialLoad());
          } else {
            // profile didn't return user — leave as is (possible but unlikely)
          }
        } catch (err) {
            console.log("Failed to fetch profile after refresh", err);
          // swallow: best effort
        }

        // retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed — logout
        lastFailedRefreshAt = Date.now();
        api.dispatch(logout());
      }
    } catch (err) {
      lastFailedRefreshAt = Date.now();
      console.log("Refresh token request failed: ", err);
      api.dispatch(logout());
    } finally {
      release();
    }
  } else {
    // Wait for ongoing refresh to finish then retry the original request
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
