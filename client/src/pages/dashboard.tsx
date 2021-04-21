import { navigate } from "gatsby";
import React, { useContext } from "react";
import DefaultLayout from "../components/layouts/default-layout";
import SEO from "../components/seo";
import { PageContext } from "../types/types";
import { View } from '../components/dashboard';

const Dashboard: React.FC<PageContext> = ({
  pageContext,
  location,
}) => {
  return (
    <DefaultLayout pageContext={pageContext} location={location}>
      <SEO title="Dashboard" />
      <View />
    </DefaultLayout>
  );
};

export default Dashboard;
