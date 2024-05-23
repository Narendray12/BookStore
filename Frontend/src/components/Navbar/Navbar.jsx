import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-Books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }
  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-4 items-center justify-between flex">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="Logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center justify-center">
                {items.title === "Profile" ? (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}{" "}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}{" "}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className=" hidden md:flex gap-4">
            {isLoggedIn === false ? (
              <>
                <Link
                  to="Login"
                  className="px-4 py-1 border border-bluw-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  {" "}
                  SignUp
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />{" "}
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} absolute bg-zinc-800 h-screen top-0 left-0 w-full z-40 flex flex-col items-center justify-center `}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${MobileNav} text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`}
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}
        {isLoggedIn === false ? (
          <>
            <Link
              to="Login"
              className="px-4 py-1 border border-bluw-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              {" "}
              SignUp
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navbar;
