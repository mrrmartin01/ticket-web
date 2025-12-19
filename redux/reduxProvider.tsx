"use client";
import { useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { initAuth } from "./features/auth/initAuth";
import { useAppDispatch } from "./reduxHook";

export default function CustomProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);

  return (
    <Provider store={store}>
      <InitAuthRunner>{children}</InitAuthRunner>
    </Provider>
  );
}
function InitAuthRunner({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return <>{children}</>;
}

