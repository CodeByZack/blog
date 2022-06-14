import React from 'react';
// Button.tsx
var Button = (props) => {
  const { onClick, style, children } = props;
  return /* @__PURE__ */ React.createElement("button", {
    style,
    onClick
  }, children);
};
var Button_default = Button;

// ThemeIcon.tsx
import { useEffect, useState } from "react";
var ThemeIcon = (props) => {
  const { theme, setTheme } = props;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "bg-gray-200 dark:bg-gray-800 rounded p-3 w-[40px] h-[40px]",
    onClick: () => setTheme(theme === "dark" ? "light" : "dark")
  }, mounted && /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    className: "h-4 w-4 text-gray-800 dark:text-gray-200"
  }, theme === "dark" ? /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  }) : /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })));
};
var ThemeIcon_default = ThemeIcon;

// blog-components.tsx
var BlogComponents = {
  Button: Button_default,
  ThemeIcon: ThemeIcon_default
};
var blog_components_default = BlogComponents;
export {
  BlogComponents,
  blog_components_default as default
};
