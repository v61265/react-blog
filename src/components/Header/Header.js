import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 64px;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: #636b46;
  color: #e9e7da;
  padding: 0 32px;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const Brand = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  margin-right: 10px;
  display: flex;
  height: 64px;
  align-items: center;
  color: #e9e7da;
  text-decoration: none;
`;

const NavebarList = styled.div`
  display: flex;
  font-ssize: 24px;
  align-items: center;
`;

const Nav = styled(Link)`
  display: flex;
  height: 64px;
  align-items: center;
  padding: 0 20px;
  color: #e9e7da;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: white;
    background: #373f27;
  }

  & + & {
    margin-left: 5px;
  }

  ${(props) =>
    props.$active &&
    `
  background: #373f27;`}
`;

export default function Header() {
  const location = useLocation().pathname;
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    history.push("/");
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand to='/'>生菜的部落格</Brand>
        <Nav to='/about' $active={location === "/about"}>
          關於我
        </Nav>
        <NavebarList>
          {user && (
            <Nav to='/addPost' $active={location === "/addPost"}>
              發布文章
            </Nav>
          )}
        </NavebarList>
      </LeftContainer>
      <NavebarList>
        {!user && (
          <>
            <Nav to='/register' $active={location === "/register"}>
              註冊
            </Nav>
            <Nav to='/login' $active={location === "/login"}>
              登入
            </Nav>
          </>
        )}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavebarList>
    </HeaderContainer>
  );
}
