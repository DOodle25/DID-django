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
import { NavLink } from "react-router-dom";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to="/" className="">
            <div className="font-semibold text-blue-900 text-lg leading-tight">District Integrated <br/> Dashboard</div>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
{/* bg-blue-900 py-2 rounded-xl px-4 text-white hover:bg-blue-800 */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem className="">
          <NavLink to="/">
            Dashboard
          </NavLink>
        </NavbarItem>
        <NavbarItem className="">
          <NavLink to = "/population">
            Population
          </NavLink>
        </NavbarItem>
        <NavbarItem className="">
          <NavLink to="/demography">
            Demography
          </NavLink>
        </NavbarItem>
        

        <NavbarItem>
          <NavLink to="/profile">
            <div className="">
              Profile
            </div>
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem className="flex flex-col">
          <NavLink to="/"><div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">Dashboard</div></NavLink>
            <NavLink to="/population"><div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">Population</div></NavLink>
            <NavLink to="/demography"><div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">Demography</div></NavLink>
            <NavLink to="/profile"><div className="bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800">Profile</div></NavLink>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
