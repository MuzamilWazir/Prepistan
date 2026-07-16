"use client";

import { OAuthGate } from "../../../components/OAuthGate";
import App from "../../../components/App";

export default function DashboardPage() {
  return (
    <OAuthGate>
      <App initialTab="dashboard" />
    </OAuthGate>
  );
}
