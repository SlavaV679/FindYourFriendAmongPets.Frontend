import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/router.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={customTheme}>
    <RouterProvider router={Router} />
  </ThemeProvider>
);
