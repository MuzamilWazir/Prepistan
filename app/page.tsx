"use client";

import { AppProvider } from "../components/AppContext";
import PublicLandingPage from "../components/PublicLandingPage";
import ToastContainer from "../components/ToastContainer";

export default function RootPage() {
  return (
    <AppProvider initialTab="dashboard">
      <PublicLandingPage />
      <ToastContainer />
    </AppProvider>
  );
}
