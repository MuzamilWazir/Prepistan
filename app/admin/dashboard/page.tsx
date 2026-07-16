"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useApp } from "../../../components/AppContext";
import AdminPanel from "../../../components/AdminPanel";
import { apiAdminGetUsers, apiAdminUpdateUserRole, apiAdminDeleteUser, type AuthUser } from "../../../lib/api";

export default function AdminDashboardPage() {
  const {
    mcqs, handleAddMCQ, handleDeleteMCQ, language,
    courses, handleAddCourse, handleDeleteCourse,
    courseCategories, handleAddCourseCategory,
    paymentConfig, handleUpdatePaymentConfig,
    mcqCategories, handleAddMcqCategory, handleDeleteMcqCategory,
    mcqSubjects, handleAddMcqSubject, handleDeleteMcqSubject,
    aiConfig, setAiConfig,
    adsenseConfig, handleUpdateAdSenseConfig,
  } = useApp();

  const [users, setUsers] = useState<AuthUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const fetchUsers = useCallback(async (searchVal?: string, roleVal?: string) => {
    const token = localStorage.getItem("prepistan_token");
    if (!token) return;
    try {
      const res = await apiAdminGetUsers(token, {
        page: 1,
        limit: 200,
        search: searchVal ?? search,
        role: roleVal ?? roleFilter,
      });
      setUsers(res.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }, [search, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(search, roleFilter), 300);
    return () => clearTimeout(timer);
  }, [search, roleFilter, fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const token = localStorage.getItem("prepistan_token");
    if (!token) return;
    try {
      await apiAdminUpdateUserRole(token, { userId, role: newRole });
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, role: newRole, isPremium: newRole === "Premium Student" || newRole === "Super Admin" } : u));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u._id === userId);
    if (!confirm(`Are you sure you want to delete ${user?.name || "this user"}?`)) return;
    const token = localStorage.getItem("prepistan_token");
    if (!token) return;
    try {
      await apiAdminDeleteUser(token, userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Manage users, content, and platform settings.</p>
      </div>

      {/* Admin Panel with all management features */}
      <AdminPanel
        mcqs={mcqs}
        onAddMCQ={handleAddMCQ}
        onDeleteMCQ={handleDeleteMCQ}
        language={language}
        courses={courses}
        onAddCourse={handleAddCourse}
        onDeleteCourse={handleDeleteCourse}
        courseCategories={courseCategories}
        onAddCourseCategory={handleAddCourseCategory}
        paymentConfig={paymentConfig}
        onUpdatePaymentConfig={handleUpdatePaymentConfig}
        mcqCategories={mcqCategories}
        onAddMcqCategory={handleAddMcqCategory}
        onDeleteMcqCategory={handleDeleteMcqCategory}
        mcqSubjects={mcqSubjects}
        onAddMcqSubject={handleAddMcqSubject}
        onDeleteMcqSubject={handleDeleteMcqSubject}
        aiConfig={aiConfig}
        onUpdateAIConfig={setAiConfig}
        adsenseConfig={adsenseConfig}
        onUpdateAdSenseConfig={handleUpdateAdSenseConfig}
        realUsers={users}
        onRoleChange={handleRoleChange}
        onDeleteUser={handleDeleteUser}
        userSearch={search}
        onUserSearchChange={setSearch}
        userRoleFilter={roleFilter}
        onUserRoleFilterChange={setRoleFilter}
      />
    </div>
  );
}
