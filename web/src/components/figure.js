import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import clientConfig from '../../client-config';

import styles from './figure.module.css';

import styled from 'styled-components';
import { Main, theme, mixins, media } from '@styles';

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
`;

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }

  const fluidProps = getFluidGatsbyImage(node.asset._ref, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <StyledImageContainter className={styles.root}>
      <Img fluid={fluidProps} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </StyledImageContainter>
  );
};
