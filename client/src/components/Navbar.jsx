import React from "react";

import { Link } from "react-router-dom";

import { Nav } from "../styles/Navbar.styled";

const Navbar = () => {
  return (
    <Nav>
      <Link to='/character'>캐릭터</Link>
      <Link to='/inventory'>인벤토리</Link>
      <Link to='/field'>사냥터</Link>
    </Nav>
  );
};

export default Navbar;
