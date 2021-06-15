import React from "react";
import MainNav from "../navigation/main-nav";

interface Props {
  siteTitle: string;
  path: string;
}

const Header: React.FC<Props> = ({ siteTitle, path }) => {
  return (
    <>
      <header className="au-grid au-header au-header--dark flare" role="banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <a className="au-header__brand" href="/">
                <img className="au-header__brand-image" alt="The Australian Government Coat of Arms" src="/coat-of-arms.svg" />
                <div className="au-header__text">
                  <h1 className="au-header__heading">{siteTitle}</h1>
                  <div className="au-header__subline">
                    {<>A Digital Profession <span style={{ fontWeight: 'bolder' }}>mobility pilot</span> program</>}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>
      <MainNav path={path} />
    </>
  );
};

export default Header;
