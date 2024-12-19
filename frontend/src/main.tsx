import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ButtonAppBar from "./components/ButtonAppBar.tsx";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={customTheme}>
    <ButtonAppBar />
    <App />
  </ThemeProvider>
);
