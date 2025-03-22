import React, { useState, useEffect } from "react";
import "./styles/ThemeSwitch.css"; // Import the CSS from above

export default function ThemeButton() {
  const [theme, setTheme] = useState(
    // Prefer user-saved theme; if none, check system dark mode
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    // Toggle the 'dark' class on <html> based on current theme
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // The checkbox is checked if theme === 'dark'
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <span className="slider"></span>
    </label>
  );
}
