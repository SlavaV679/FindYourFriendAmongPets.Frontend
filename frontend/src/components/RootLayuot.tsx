import { Outlet } from "react-router-dom";
import HeaderNavigation from "./HeaderNavigation";
import Footer from "./Footer";

export function RootLayout() {
  return (
    <div className="flex flex-col">
      <HeaderNavigation />
      <main className="flex flex-col h-full px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
