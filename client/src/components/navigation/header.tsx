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
                    {siteTitle}
                  </>
                }
                subline={<>A Digital Profession <span style={{ color: '#DA0C91', fontWeight: 'bold' }}>alpha</span> Program</>}
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
