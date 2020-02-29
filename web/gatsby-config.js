/* eslint-disable import/no-extraneous-dependencies */
// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const path = require('path');

const config = require('./src/config');

const clientConfig = require('./client-config');

const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl,
    description: config.siteDescription
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-sharp`,
    'gatsby-transformer-sharp',
    // {
    //   resolve: `gatsby-plugin-alias-imports`,
    //   options: {
    //     alias: {
    //       '@components': path.resolve(__dirname, 'src/components'),
    //       '@styles': path.resolve(__dirname, 'src/styles'),
    //       '@fonts': path.resolve(__dirname, 'src/fonts'),
    //       '@config': path.resolve(__dirname, 'src/config'),
    //       '@images': path.resolve(__dirname, 'src/images'),
    //       '@utils': path.resolve(__dirname, 'src/utils')
    //     },
    //     extensions: []
    //   }
    // },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     implementation: require("sass"),
    //   },
    // },
    'gatsby-plugin-postcss'
  ]
};
