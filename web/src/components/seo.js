import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ siteTitle, sitePath, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query MetaQuery {
          site {
            siteMetadata {
              title
              siteUrl
              description
            }
          }
        }
      `}
      render={({ site }) => {
        const metadata = site.siteMetadata;
        const title = siteTitle ? `${siteTitle} | ${metadata.title}` : metadata.title;
        const siteURL = sitePath ? `${metadata.siteUrl}${sitePath}` : metadata.siteUrl;
        return (
          <Helmet>
            <title itemProp="name" lang="en">
              {title}
            </title>
            <link rel="canonical" href={siteURL} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:url" content={siteURL} />
            <meta property="og:site_name" content={metadata.title} />
            <meta itemProp="name" content={title} />
            <meta name="twitter:url" content={siteURL} />
            <meta name="twitter:title" content={title} />
            {children}
          </Helmet>
        );
      }}
    />
  );
};

export default SEO;

SEO.propTypes = {
  metadata: PropTypes.object.isRequired,
};
