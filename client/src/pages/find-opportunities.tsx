import * as React from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";

// markup
const FindOpportunitiesPage: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <>
        <SEO title="Find Opportunities" />
        <div className="container-fluid">
          <nav className="au-breadcrumbs" aria-label="breadcrumb">
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="../#">Home</a>
              </li>
              <li>Find opportunities</li>
            </ul>
          </nav>
        </div>
        <div className="container-fluid au-body">
          <h1>Find opportunities</h1>
          <div className="row">
            <div className="col-md-2">
              <br />
              <p>Filter</p>
            </div>
            <div className="row">
              <ul className="au-card-list au-card-list--matchheight">
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h2>Card 1</h2>
                      </div>
                      <p>Some text</p>
                      <p>Additional text</p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h2>Card 2</h2>
                      </div>
                      <p>Some text</p>
                      <p>Additional text</p>
                      <p>More text</p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h2>Card 2</h2>
                      </div>
                      <p>Some text</p>
                      <p>Additional text</p>
                      <p>More text</p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h2>Card 2</h2>
                      </div>
                      <p>Some text</p>
                      <p>Additional text</p>
                      <p>More text</p>
                    </div>
                  </div>
                </li>
                <li className="col-md-4 col-sm-6">
                  <div className="au-card">
                    <div className="au-card__inner">
                      <div className="au-card__title">
                        <h2>Card 2</h2>
                      </div>
                      <p>Some text</p>
                      <p>Additional text</p>
                      <p>More text</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default FindOpportunitiesPage;
