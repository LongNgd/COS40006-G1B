import { Link, useNavigate } from "@tanstack/react-router";
import { LucideLogOut, LucideSchool } from "lucide-react";
import { navigation } from "./navigation";
import React from "react";
import { useAuth } from "../../hooks/useAuth.hook";

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/" });
  };
  return (
    <div className="flex flex-col w-64 text-[#d0cde4] bg-[#2f3349] p-3 h-lvh">
      <div className="text-2xl font-bold flex gap-2 items-center">
        <LucideSchool />
        SchoolHub
      </div>
      <nav>
        {navigation.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-2 items-center mt-2 py-1 px-6
            hover:bg-[#3d4056] rounded text-lg"
            activeProps={{
              className: "bg-primary hover:bg-primary text-[white]",
            }}
          >
            {React.createElement(item.icon)}
            {item.name}
          </Link>
        ))}
        <a
          className="flex gap-2 items-center mt-2 py-1 px-6 hover:bg-[#3d4056] hover:cursor-pointer rounded text-lg"
          onClick={handleSignOut}
        >
          <LucideLogOut />
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Navbar;