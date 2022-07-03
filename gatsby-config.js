require("dotenv").config({
  path: `.env`,
})

module.exports = {
  pathPrefix: "/CryptoDash",
  siteMetadata: {
    title: `Crypto Currency Dashboard`,
    description: `https://howardwarren1982.github.io/ProjectSite/`,
    author: `Howard Warren`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-firebase-v9.0",
      options: {
        credentials: {
          apiKey: process.env.GATSBY_APIKEY,
          authDomain: process.env.GATSBY_AUTHDOMAIN,
          databaseURL: process.env.GATSBY_DATABASEURL,
          projectId: process.env.GATSBY_PROJECTID,
          storageBucket: process.env.GATSBY_STORAGEBUCKET,
          messagingSenderId: process.env.GATSBY_MESSAGINGSENDERID,
          appId: process.env.GATSBY_APPID,
          measurementId: process.env.GATSBY_MEASUREMENTID,
        },
      },
    },

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
        name: `Howard's Crypto Currency Dashboard`,
        short_name: `Dashboard`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/facepic.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
