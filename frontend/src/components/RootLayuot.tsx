import { Outlet } from "react-router-dom";
import HeaderNavigation from "./HeaderNavigation";

export function RootLayout() {
  return (
    <div>
      <HeaderNavigation />
      <Outlet />
    </div>
  );
}
