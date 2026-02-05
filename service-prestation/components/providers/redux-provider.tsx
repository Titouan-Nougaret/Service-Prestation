"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, persistor } from "@/store/store";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/user-slice";

function AuthSync() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    console.log("AuthSync - Current User in Store:", user);
    // On fetch si on a pas de user, OU si on a un user mais pas de nom (hydratation partielle)
    if (!user || (user && !user.name)) {
      console.log(
        "AuthSync - User missing or incomplete, fetching /api/auth/me...",
      );
      fetch("/api/auth/me")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Unauthorized");
        })
        .then((data) => {
          console.log("AuthSync - /api/auth/me response:", data);
          if (data.user) {
            dispatch(setUser(data.user));
          }
        })
        .catch((err) => {
          console.log("AuthSync - Fetch error or unauthorized:", err.message);
        });
    }
  }, [user, dispatch]);

  return null;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => makeStore());
  const [p] = useState(() => persistor(store));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={p}>
        <AuthSync />
        {children}
      </PersistGate>
    </Provider>
  );
}
