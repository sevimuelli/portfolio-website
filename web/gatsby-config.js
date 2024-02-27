/* eslint-disable import/no-extraneous-dependencies */
// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const path = require('path');

const config = require('./src/config');

const clientConfig = require('./client-config');

const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === 'production';

const adapter = require("gatsby-adapter-netlify")

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl,
    description: config.siteDescription,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token,
      },
    },
    adapter: adapter({
      excludeDatastoreFromEngineFunction: false,
      imageCDN: false,
    }),
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'SeverinMüller',
        short_name: 'SeverinMüller',
        start_url: '/',
        background_color: config.darkNavyColor,
        theme_color: config.navyColor,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
  ],
};
