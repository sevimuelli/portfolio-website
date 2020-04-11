import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
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

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }

  const fluidProps = getFluidGatsbyImage(node.asset._ref, { maxWidth: 800 }, clientConfig.sanity);

  return (
    <StyledImageContainter>
      <Img fluid={fluidProps} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </StyledImageContainter>
  );
};
