import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Nav, NavContent } from '../../types/auds';

interface Props {
  path: string;
}

const isActive = (currentPath, path) => {
  return currentPath === path;
}

const MainNav: React.FC<Props> = ({ path }) => {
  const user = useContext(UserContext);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const always = [{
      text: "Home",
      link: "/",
      active: isActive(path, '/')
    }];

    setMenu(always);
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
