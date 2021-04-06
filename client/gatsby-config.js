module.exports = {
  siteMetadata: {
    title: `Observatory`,
    description: `The Observatory’s goal is to measure how people interact with government services. It empowers and supports teams to provide better services and outcomes for everyone.`,
    author: `Digital Transformation Agency`,
    siteUrl: `https://observatory.service.gov.au/`,
    menuLinks: [
      {
        text: "Home",
        link: "/",
      },
    ],
    footerLinks: [
      {
        text: "Privacy Policy",
        link: "/privacy",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
