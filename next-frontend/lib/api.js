import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5030/api",
});

export const authHeader = () => {
  if (typeof window === "undefined") return {};

  const token =
    localStorage.getItem("vorixa-admin-token") ||
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getPublicUrl = (path) => {
  if (!path) return "";

  if (typeof path !== "string") {
    return "";
  }

  const value = path.trim();
  if (!value) return "";

  if (value.startsWith("http")) {
    return value;
  }

  if (value.startsWith("/assets/")) {
    return value;
  }
  const rawApi = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5030/api";
  const apiBase = rawApi.replace(/\/api\/?$/, "");

  if (value.startsWith("/uploads/")) {
    return `${apiBase}${value}`;
  }

  if (value.startsWith("uploads/")) {
    return `${apiBase}/${value}`;
  }

  const looksLikeUploadedFile = /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(value);
  const normalizedPath = value.startsWith("/")
    ? value
    : looksLikeUploadedFile
      ? `/uploads/${value}`
      : `/${value}`;

  return `${apiBase}${normalizedPath}`;
};
