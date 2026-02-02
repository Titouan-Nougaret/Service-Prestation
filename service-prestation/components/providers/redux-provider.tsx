"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, persistor } from "@/store/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize the store once using useState initializer function
  const [store] = useState(() => makeStore());
  const [p] = useState(() => persistor(store));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={p}>
        {children}
      </PersistGate>
    </Provider>
  );
}
