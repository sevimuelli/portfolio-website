import React from 'react';
import PropTypes from 'prop-types';
import config from '@config';
import ogImage from '@images/og.png';

export default function Head({ location, data, pageContext }) {
    const sitePath = location.pathname;
    let siteTitle;
    switch (sitePath) {
        case '/404/':
            siteTitle = '404';
            break;
        case '/archive/':
            siteTitle = 'Archive';
            break;
        case '/success/':
            siteTitle = 'Success page';
            break;
        case '/tags/':
            siteTitle = 'Tags';
            break;
        case '/':
            siteTitle = 'Home';
            break;
        default:
            siteTitle = pageContext.title;
    }

    const metadata = data.metadata.siteMetadata;
    const title = siteTitle ? `${siteTitle} | ${metadata.title}` : metadata.title;
    const siteURL = sitePath ? `${metadata.siteUrl}${sitePath}` : metadata.siteUrl;

    return (
        <>
            {/* <html lang="en" prefix="og: http://ogp.me/ns#" /> */}
            <html lang="en" />
            <title itemProp="name" lang="en">
                {title}
            </title>

            <link rel="canonical" href={siteURL} />

            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={config.siteKeywords} />
            <meta name="theme-color" content={config.navyColor} />

            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteURL} />
            <meta property="og:site_name" content={metadata.title} />
            <meta property="og:image" content={`${config.siteUrl}${ogImage}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:locale" content={config.siteLanguage} />

            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={metadata.description} />
            <meta itemProp="image" content={`${config.siteUrl}${ogImage}`} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteURL} />
            <meta name="twitter:site" content={config.twitterHandle} />
            <meta name="twitter:creator" content={config.twitterHandle} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content={`${config.siteUrl}${ogImage}`} />
            <meta name="twitter:image:alt" content={metadata.title} />
        </>
    );
}

Head.propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
};
