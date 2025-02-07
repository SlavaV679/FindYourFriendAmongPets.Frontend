import { Button, LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../contexts/auth/useAuth";

export function ProfilePage() {
  const { user } = useAuth();
  const testUser = {
    fullName: "Сачков Кирилл Олегович",
    nickname: "sachkov_kirill",
    github: "https://github.com/Julia-Sachkova",
    level: 3,
    expirience: 80,
    avatar:
      "https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg",
    roles: ["admin", "user"],
  };
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 7,
    borderRadius: 5,
    width: "100%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "rgb(115 115 115)",
    },
  }));

  return (
    <section className="flex flex-row gap-10 px-6 py-8">
      <div className="px-4 py-5 bg-neutral-600 rounded-xl w-1/4 flex flex-col items-center">
        <img
          src={testUser.avatar}
          alt="аватар."
          className="w-36 h-36 rounded-full object-cover mb-5"
        />

        <span className="text-xl mb-1">{testUser.nickname}</span>
        <span className="text-neutral-400 mb-5">{testUser.fullName}</span>

        <Button variant="outlined">Редактировать профиль</Button>
      </div>

      <div className="px-4 py-5 bg-neutral-600 rounded-xl flex-1 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-xl uppercase font-light">
            {testUser.level} уровень
          </span>

          <div className="w-1/3 flex flex-row items-center gap-2">
            <BorderLinearProgress
              variant="determinate"
              value={testUser.expirience}
            />
            <span className="text-sm text-neutral-400">
              {testUser.expirience}/100
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          <li className="flex flex-col">
            <span className="text-sm text-neutral-400">User ID</span>
            <span>{user?.id ?? "..."}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-sm text-neutral-400">Email</span>
            <span>{user?.email ?? "..."}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-sm text-neutral-400">GitHub</span>
            <span>{testUser.github}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-sm text-neutral-400">Роли</span>

            <ul className="flex flex-row flex-wrap gap-2 mt-1">
              {testUser.roles.map((role) => (
                <li key={role} className="border-2 border-neutral-500 px-2">
                  {role}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
