module.exports = {
  proxy: {
    prefix: "/api",
    url: "http://api:5001",
  },
  siteMetadata: {
    title: `oneAPS Opportunities`,
    description: `A place to find flexible work opportunities across the APS to
    help deliver outcomes for government and the citizens we all
    serve.`,
    author: `Digital Transformation Agency`,
    siteUrl: `https://oneAPS.gov.au/`,
    footerLinks: [
      {
        text: "Privacy Policy",
        link: "/privacy",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content`,
    //     name: `markdown-pages`,
    //   },
    // },
    "gatsby-transformer-remark",
    //'gatsby-plugin-tsconfig-paths',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};
