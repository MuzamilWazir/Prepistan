"use client";

import { AppProvider } from "../../components/AppContext";
import PublicLandingPage from "../../components/PublicLandingPage";

export default function HomePage() {
  return (
    <AppProvider initialTab="dashboard">
      <PublicLandingPage />
    </AppProvider>
  );
}
