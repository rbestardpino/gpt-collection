import { signIn } from "next-auth/react";

const login = () => {
  return (
    <div className="h-max w-max">
      <button className="btn m-10" onClick={() => signIn()}>
        Login
      </button>
    </div>
  );
};

export default login;
