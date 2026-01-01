import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait for any in-flight refresh
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  // 401 encountered
  if (!mutex.isLocked()) {
    const release = await mutex.acquire();

    try {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST" },
        api,
        extraOptions
      );

      if (!refreshResult.data) {
        // Refresh failed — let caller handle auth state
        return result;
      }

      // Refresh succeeded → retry original request
      result = await baseQuery(args, api, extraOptions);
    } finally {
      release();
    }
  } else {
    // Wait for refresh and retry
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
