import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig, email } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, Button } from '@styles';
const { colors, fontSizes, fonts } = theme;

import BlockContent from '../block-content';

const StyledContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 100px;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledHeading = styled(Heading)`
  display: block;
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.sm};
    ${media.desktop`font-size: ${fontSizes.smish};`};
  }
  &:after {
    display: none;
  }
`;
const StyledTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 60px;
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 50px;
`;

const StyledForm = styled.div`
  margin: 60px auto;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 20px auto;
`;

const StyledInput = styled.input`
  display: block;
  margin: 8px auto;
  background-color: ${colors.lightGrey};
  border-color: ${colors.green}
`;
const StyledTextArea = styled.textarea`
  display: block;
  resize: none;
  width: 60%;
  height: 100px;
  margin: 8px auto;
  background-color: ${colors.lightGrey};
  border-color: ${colors.green};

  ${media.tablet`width: 80%;`};

`;

const StyledMoreButton = styled(Button)`
  margin: 50px auto 0;
`;


const Contact = ({ data }) => {
  const { title, _rawDescription } = data[0].node;

  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledHeading>What&apos;s Next?</StyledHeading>

      <StyledTitle>{title}</StyledTitle>

      {_rawDescription && <BlockContent blocks={_rawDescription || []} />}

      <StyledForm>
        <form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="bot-field" />
          <p>
            <StyledLabel>
              Your Name:
              <StyledInput type="text" name="name" />
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Your Email: <StyledInput type="email" name="email" />
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Message: <StyledTextArea name="message"></StyledTextArea>
            </StyledLabel>
          </p>
          <p>
            <StyledMoreButton type="submit">Send</StyledMoreButton>
          </p>
        </form>
      </StyledForm>

      {/* <StyledEmailLink href={`mailto:${email}`} target="_blank" rel="nofollow noopener noreferrer">
        Say Hello
      </StyledEmailLink> */}
    </StyledContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired
};

export default Contact;
