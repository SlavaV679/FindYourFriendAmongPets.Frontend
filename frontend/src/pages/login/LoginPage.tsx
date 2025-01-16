import { Button, Skeleton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";

export function LoginPage() {
  type LoginFields = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const { login, accessToken, isLoading, isError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFields) => {
    await login(data.email, data.password);

    navigate("/profile");
  };
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : (
        <div className="flex flex-col h-full w-full  px-10 py-6 justify-center items-start gap-4">
          <NavLink to={"/"} className="text-lg">
            Back to main
          </NavLink>
          <div className="flex flex-col min-w-80 mx-auto justify-center items-center gap-9">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full items-center gap-7"
            >
              <TextField
                variant="standard"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                {...register("email", {
                  required: "This field is requared",
                  validate: (value) => {
                    if (!value.includes("@")) {
                      return "Email should contains '@'";
                    }
                  },
                })}
              />
              <TextField
                variant="standard"
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                {...register("password", {
                  validate: (value) => {
                    if (value.length < 2) {
                      return "Password lenght should be more then 1";
                    }
                  },
                })}
              />
              <Button type="submit">Enter</Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
