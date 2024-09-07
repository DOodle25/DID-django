import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Logo from "../../assets/Logo";
import { NavLink } from "react-router-dom";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // const menuItems = [
  //   "Population",
  //   "Upload CSV",
  //   "Demography",
  //   "Profile",
  // ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to = "/population">
            Population
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/upload">
            Upload CSV
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/demography">
            Demography
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/register">
            Register
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <NavLink to="/profile">
            <div className="bg-blue-300 py-2 rounded-xl px-4 text-gray-800 hover:bg-blue-200">
              Profile
            </div>
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem className="flex flex-col">
            <NavLink to="/population">Population</NavLink>
            <NavLink to="/upload">Upload CSV</NavLink>
            <NavLink to="/demography">Demography</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
