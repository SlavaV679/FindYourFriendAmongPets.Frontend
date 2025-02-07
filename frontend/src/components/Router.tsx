import { createBrowserRouter } from "react-router-dom";
import { Users } from "../pages/users/users";
import { Volunteers } from "../pages/volunteers/volunteers";
import { RootLayout } from "./RootLayuot";
import { MainPage } from "../pages/main/main";
import { HelpAnimals } from "../pages/HelpAnimals/HelpAnimals";
import { LoginPage } from "../pages/login/LoginPage";
import { ProfilePage } from "../pages/profile/profile";
import { Upload } from "./Upload";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "volunteers",
        element: <Volunteers />,
      },
      {
        path: "helpanimals",
        element: <HelpAnimals />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
    ],
    errorElement: <div>Handling error. </div>,
  },
]);
