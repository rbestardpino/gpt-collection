import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="h-max w-max">
      <button className="btn m-10" onClick={() => void signIn()}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
