"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggle}
      aria-label="切换明暗主题"
    >
      <Moon className="theme-icon-light" size={17} aria-hidden="true" />
      <Sun className="theme-icon-dark" size={17} aria-hidden="true" />
    </button>
  );
}
