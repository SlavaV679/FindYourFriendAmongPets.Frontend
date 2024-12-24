import { AppBar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HeaderNavigation() {
  return (
    <AppBar position="static">
      <div className="flex flex-row items-center justify-between py-2 px-3">
        <div className="flex flex-row items-center justify-center gap-4">
          <NavLink className="text-2xl pr-6" to={"/main"}>
            Pet Family
          </NavLink>
          <NavLink className="text-xl" to={"/main"}>
            Main
          </NavLink>
          <NavLink className="text-xl" to={"/volunteers"}>
            Volunteers
          </NavLink>
          <NavLink className="text-xl" to={"/helpanimals"}>
            Help animals
          </NavLink>
        </div>
        <Button color="inherit">Login</Button>
      </div>
    </AppBar>
  );
}
