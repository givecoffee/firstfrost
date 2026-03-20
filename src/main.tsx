// src/main.tsx
// Updated Week 7 — renders AppShell instead of a single view.
// AppShell manages swipe navigation between outdoor and indoor views.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppShell       from "./components/AppShell";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

createRoot(root).render(
  <StrictMode>
    <AppShell />
  </StrictMode>
);
