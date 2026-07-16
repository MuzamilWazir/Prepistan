"use client";

import React from "react";
import { AppProvider, useApp } from "./AppContext";
import AppShell from "./AppShell";
import ToastContainer from "./ToastContainer";

function AppInner() {
  const { currentUser, sessionLoading } = useApp();

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser.isLoggedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
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
