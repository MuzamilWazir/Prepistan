"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppProvider, useApp } from "../../components/AppContext";

function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser, currentRole, sessionLoading } = useApp();

  useEffect(() => {
    if (sessionLoading) return;
    if (!currentUser.isLoggedIn) {
      router.replace("/admin/login");
    } else if (currentRole !== "Admin" && currentRole !== "Super Admin") {
      router.replace("/dashboard");
    }
  }, [currentUser.isLoggedIn, currentRole, sessionLoading, router]);

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-pulse text-sm text-slate-400 font-semibold">Loading session...</div>
      </div>
    );
  }

  if (!currentUser.isLoggedIn || (currentRole !== "Admin" && currentRole !== "Super Admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-pulse text-sm text-slate-400 font-semibold">Verifying admin access...</div>
      </div>
    );
  }

  return <>{children}</>;
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { handleLogout } = useApp();

  const handleAdminLogout = () => {
    handleLogout();
    localStorage.removeItem("prepistan_token");
    localStorage.removeItem("prepistan_user");
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {isLoginPage ? (
        children
      ) : (
        <AdminGate>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm">A</div>
                  <div>
                    <span className="text-xs font-black text-white block leading-none">Admin Panel</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Prepistan Control Room</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a href="/dashboard" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                    ← Back to App
                  </a>
                  <button onClick={handleAdminLogout} className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </header>
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </AdminGate>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider initialTab="admin">
        <AdminLayoutInner>{children}</AdminLayoutInner>
    </AppProvider>
  );
}
