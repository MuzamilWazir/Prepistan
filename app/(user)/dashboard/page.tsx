"use client";

import { useEffect } from "react";
import App from "../../../components/App";
import { extractOAuthParams, clearOAuthParams } from "../../../lib/api";

export default function DashboardPage() {
  useEffect(() => {
    const params = extractOAuthParams();
    if (params?.error) {
      clearOAuthParams();
      return;
    }
    if (params?.token && params?.user) {
      try {
        const user = JSON.parse(decodeURIComponent(params.user));
        localStorage.setItem("prepistan_token", params.token);
        if (params.refresh) {
          localStorage.setItem("prepistan_refresh", params.refresh);
        }
        localStorage.setItem(
          "prepistan_user",
          JSON.stringify({
            name: user.name,
            email: user.email,
            isLoggedIn: true,
            provider: user.provider || "Google",
          })
        );
        clearOAuthParams();
        // Force reload to pick up new auth state
        window.location.replace("/dashboard");
      } catch {
        clearOAuthParams();
      }
    }
  }, []);

  return <App initialTab="dashboard" />;
}
