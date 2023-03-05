import { useSession } from "next-auth/react";
import Link from "next/link";
import AddAppButton from "./AddAppDialog";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/browse">Browse all</Link>
            </li>
            <li>
              <Link href="/why">Why</Link>
            </li>
            {sessionData?.user.role === "ADMIN" && (
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          <span className="text-primary">GPT</span> Collection
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/browse">Browse all</Link>
          </li>
          <li>
            <Link href="/why">Why</Link>
          </li>
          {sessionData?.user.role === "ADMIN" && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <AddAppButton />
      </div>
    </div>
  );
};

export default Navbar;
