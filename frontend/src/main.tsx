import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/Router.tsx";
import { AuthProvider } from "./contexts/auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={customTheme}>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </ThemeProvider>
);
