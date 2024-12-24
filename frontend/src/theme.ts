import { colors, createTheme } from "@mui/material";
import { cyan, green } from "@mui/material/colors";

export const customTheme = createTheme({
    palette: {
        mode: "light",
         primary: {
             light: colors.cyan[400],
              main: colors.cyan[500],
              dark: cyan[500],
              contrastText: "#fff",
             },
              secondary: {
                  main: green[500],
 },
 }, 
});