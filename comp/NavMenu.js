import Link from "next/link";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  height: 4rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  gap: 20px;
  border-bottom: 1px solid #ccc;
  background-color: rgb(171, 151, 205);

`;

const Menu = styled.div`
  display: flex;
  margin: 0;
  padding: 5px 10px;
  color: #f0f0f0;
  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
  &:hover {
    border-bottom: 1px solid #f0f0f0;
  }
`;


export default function NavMenu({href,children,handleClick=()=>{}}){
  return (
    <NavBar>
      <Menu>Home</Menu>
      <Menu>Profile</Menu>
    </NavBar>
  )
}