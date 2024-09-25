import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to="/" className="">
            {/* <div className="font-semibold text-blue-900 text-lg leading-tight">
              District Integrated <br /> Dashboard
            </div> */}
            <img
              src="\District Integrated.png"
              alt="Logo"
              style={{ width: "", height: "50px" }}
            />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="">
          <NavLink to="/">Dashboard</NavLink>
        </NavbarItem>
        <NavbarItem className="">
          <NavLink to="/population">About</NavLink>
        </NavbarItem>
        <NavbarItem className="">
          <NavLink to="/demography">District-Data</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/profile">
            <div className="">Profile</div>
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem className="flex flex-col">
          <NavLink to="/">
            <div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">
              Dashboard
            </div>
          </NavLink>
          <NavLink to="/population">
            <div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">
              About
            </div>
          </NavLink>
          <NavLink to="/demography">
            <div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">
              District-Data
            </div>
          </NavLink>
          <NavLink to="/profile">
            <div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">
              Profile
            </div>
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
