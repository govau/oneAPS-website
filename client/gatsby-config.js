module.exports = {
  siteMetadata: {
    title: `oneAPS Opportunities`,
    description: `A place to find flexible work opportunities across the APS to
    help deliver outcomes for government and the citizens we all
    serve.`,
    author: `Digital Transformation Agency`,
    siteUrl: `https://oneAPS.gov.au/`,
    menuLinks: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About oneAPS",
        link: "/about",
      },
      {
        text: "Register",
        link: "/register",
      },
      {
        text: "Post",
        link: "/post-opportunity",
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
