import { AppBar, Button } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
      <div className="flex flex-row items-center justify-between py-2 px-3">
        <div className="flex flex-row items-center justify-center gap-4">
          <span className="text-2xl pr-6">Pet Family</span>
          <span className="text-xl">Main</span>
          <span className="text-xl">Volunteers</span>
          <span className="text-xl">Help animals</span>
        </div>
        <Button color="inherit">Login</Button>
      </div>
    </AppBar>
  );
}
