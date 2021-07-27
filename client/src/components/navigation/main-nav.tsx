import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Nav, NavContent } from '../../types/auds';

interface Props {
  path: string;
}

const isActive = (currentPath, path) => {
  if (path === '/') {
    return currentPath === path;
  }
  return currentPath.startsWith(path);
}

const MainNav: React.FC<Props> = ({ path }) => {
  const user = useContext(UserContext);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const always = [{
      text: "Home",
      link: "/",
      active: isActive(path, '/')
    }, {
      text: "About oneAPS",
      link: "/help-pages/1-about-oneaps/",
      active: isActive(path, '/help-pages')
    }, {
      text: "Find opportunities",
      link: "/opportunity",
      active: isActive(path, '/opportunity')
    }, {
      text: "Post an opportunity",
      link: "/opportunity-guidance",
      active: isActive(path, '/opportunity-guidance')
    }];
    if (user.token) {
      setMenu(always.concat([{
        text: "My profile",
        link: "/dashboard",
        active: isActive(path, '/dashboard')
      }]));
    } else {
      setMenu(always.concat([{
        text: "Register",
        link: "/register",
        active: isActive(path, '/register')
      }, {
        text: "Login",
        link: "/login",
        active: isActive(path, '/login')
      }]));
    }
  }, [user]);
  

  return (
    <Nav dark className="nav" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <NavContent items={menu} />
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default MainNav;
