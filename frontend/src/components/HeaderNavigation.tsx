import { AppBar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

export default function HeaderNavigation() {
  const { accessToken, logout } = useAuth();

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
          <NavLink className="text-xl" to={"/upload"}>
            Upload files
          </NavLink>
          <NavLink className="text-xl" to={"/download"}>
            Download files
          </NavLink>
          <NavLink className="text-xl" to={"/delete"}>
            Delete file
          </NavLink>
        </div>

        <div className="flex flex-row gap-3">
          {accessToken ? (
            <>
              <NavLink to={"/profile"}>Profile</NavLink>
              <Button onClick={() => logout()} color="inherit">
                Logount
              </Button>
            </>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
        </div>
      </div>
    </AppBar>
  );
}
