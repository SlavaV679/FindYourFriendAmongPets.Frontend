import { createTheme } from "@mui/material";
import { green, purple } from "@mui/material/colors";

export const customTheme = createTheme({
    palette: {
        mode: "light",
         primary: {
             light: purple[400],
              main: purple[500],
              dark: purple[500],
              contrastText: "#fff",
             },
              secondary: {
                  main: green[500],
 },
 }, 
});