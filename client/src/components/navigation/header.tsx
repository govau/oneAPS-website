import React from "react";
import { AUHeader, Brand } from "../../types/auds";

interface Props {
  siteTitle: string;
}

const Header: React.FC<Props> = ({ siteTitle }) => {
  return (
    <>
      <AUHeader dark>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Brand
                title={
                  <>
                    {siteTitle} <span className="header__badge"> alpha</span>
                  </>
                }
                subline="A Digital Profession Program"
                link="/"
                brandImage={"../../coat-of-arms.svg"}
                brandImageAlt="The Australian Government Coat of Arms"
              />
            </div>
          </div>
        </div>
      </AUHeader>
    </>
  );
};

export default Header;
