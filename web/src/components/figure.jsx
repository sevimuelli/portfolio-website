import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import styled from 'styled-components';
import { media } from '@styles';
import clientConfig from '../../client-config';

const StyledImageContainter = styled.figure`
    margin-left: 80px;
    margin-right: 80px;

    ${media.tablet`
    margin-left: 50px;
    margin-right: 50px;
    `}

    ${media.phablet`
    margin-left: 20px;
    margin-right: 20px;
    `}

    @nest & figcaption {
        font-size: 14px;
        line-height: 21px;
        margin: 0.5rem 0 0;
    }
`;

export default function Figure({ value }) {
    if (!value.asset) {
        return null;
    }

    // eslint-disable-next-line no-underscore-dangle
    const imageData = getGatsbyImageData(value.asset._ref, { maxWidth: 800 }, clientConfig.sanity);

    return (
        <StyledImageContainter>
            <GatsbyImage image={imageData} alt={value.alt} />
            {value.caption && <figcaption>{value.caption}</figcaption>}
        </StyledImageContainter>
    );
}

Figure.propTypes = {
    value: PropTypes.object,
};
