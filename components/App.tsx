"use client";

import React from "react";
import { AppProvider, useApp } from "./AppContext";
import AuthPage from "./AuthPage";
import AppShell from "./AppShell";
import ToastContainer from "./ToastContainer";

function AppInner() {
  const { currentUser } = useApp();

  if (!currentUser.isLoggedIn) {
    return <AuthPage />;
  }

  return <AppShell />;
}

interface AppProps {
  initialTab?: string;
}

export default function App({ initialTab = "dashboard" }: AppProps) {
  return (
    <AppProvider initialTab={initialTab}>
      <AppInner />
      <ToastContainer />
    </AppProvider>
  );
}
