import { Outlet } from "react-router-dom";
import HeaderNavigation from "./HeaderNavigation";
import Footer from "./Footer";

export function RootLayout() {
  return (
    <div>
      <HeaderNavigation />
      <Outlet />
      <Footer />
    </div>
  );
}
