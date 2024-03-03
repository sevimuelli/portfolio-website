import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ siteTitle, sitePath, children }) {
    const data = useStaticQuery(graphql`
        query MetaQuery {
            site {
                siteMetadata {
                    title
                    siteUrl
                    description
                }
            }
        }
    `);

    const metadata = data.site.siteMetadata;
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
}

SEO.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    sitePath: PropTypes.string.isRequired,
    children: PropTypes.object,
};
