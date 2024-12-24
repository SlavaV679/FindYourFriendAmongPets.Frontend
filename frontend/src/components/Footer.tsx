import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between py-2 px-3 border-double border-2 border-cyan-500">
      <div className="flex flex-row items-start justify-left gap-4">
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
      <div>@ 2024 Sachkov Tech Corporation</div>
    </div>
  );
}
