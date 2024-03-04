import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Loader, Nav, Social, Footer } from '@components';
import styled from 'styled-components';
import { GlobalStyle } from '@styles';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
}

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default function Layout({ children, location }) {
    const isHome = location.pathname === '/';
    let shouldLoad = true;
    if (typeof window !== 'undefined') {
        shouldLoad = !window.sessionStorage.getItem('beenHere');
    }
    const [isLoading, setIsLoading] = useState(shouldLoad && isHome);
    useEffect(() => {
        if (isLoading || isHome) {
            return;
        }
        if (location.hash) {
            const id = location.hash.substring(1); // location.hash without the '#'
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                }
            }, 0);
        }
    }, [isHome, isLoading, location.hash]);

    const data = useStaticQuery(graphql`
        query LayoutQuery {
            site {
                siteMetadata {
                    title
                    siteUrl
                    description
                }
            }
            resumeFile: allSanityAboutMe {
                edges {
                    node {
                        myFiles {
                            asset {
                                url
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
        <div id="root">
            <GlobalStyle />

            {isLoading && isHome ? (
                <Loader
                    finishLoading={() => {
                        setIsLoading(false);
                        sessionStorage.setItem('beenHere', true);
                    }}
                />
            ) : (
                <StyledContent id="layout">
                    <Nav
                        isHome={isHome}
                        fileURL={data.resumeFile.edges[0].node.myFiles[0].asset.url}
                    />
                    <Social isHome={isHome} />

                    <div id="content">
                        {children}
                        <Footer />
                    </div>
                </StyledContent>
            )}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
};
