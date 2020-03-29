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

const StyledForm = styled.form`
  margin: 60px auto;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 20px auto;
`;

const StyledInput = styled.input`
  display: block;
  margin: 8px auto;
  background-color: ${colors.lightNavy};
  border-color: ${colors.green};
`;
const StyledTextArea = styled.textarea`
  display: block;
  resize: none;
  width: 60%;
  height: 100px;
  margin: 8px auto;
  background-color: ${colors.lightNavy};
  border-color: ${colors.green};

  ${media.tablet`width: 80%;`};
`;

const StyledMoreButton = styled(Button)`
  margin: 50px auto 0;
`;

const Contact = ({ data }) => {
  const { title, _rawDescription } = data[0].node;

  const revealHeading = useRef(null);
  const revealTitle = useRef(null);
  const revealDescription = useRef(null);
  const revealNameLabel = useRef(null);
  const revealNameInput = useRef(null);
  const revealMailLabel = useRef(null);
  const revealMailInput = useRef(null);
  const revealMessageLabel = useRef(null);
  const revealMessageInput = useRef(null);
  const revealButton = useRef(null);
  useEffect(() => {
    sr.reveal(revealHeading.current, srConfig());
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealDescription.current, srConfig());
    sr.reveal(revealNameLabel.current, srConfig());
    sr.reveal(revealNameInput.current, srConfig());
    sr.reveal(revealMailLabel.current, srConfig());
    sr.reveal(revealMailInput.current, srConfig());
    sr.reveal(revealMessageLabel.current, srConfig());
    sr.reveal(revealMessageInput.current, srConfig());
    sr.reveal(revealButton.current, srConfig());
  }, []);

  return (
    <StyledContainer id="contact">
      <StyledHeading ref={revealHeading}>What&apos;s Next?</StyledHeading>

      <StyledTitle ref={revealTitle}>{title}</StyledTitle>

      {_rawDescription && <BlockContent ref={revealDescription} blocks={_rawDescription || []} />}

      <StyledForm
        name="contact"
        method="post"
        netlify-honeypot="bot-field"
        data-netlify="true"
        action="/success"
      >
        <input type="hidden" name="bot-field" />
        <p>
          <StyledLabel ref={revealNameLabel}>
            Your Name:
            <StyledInput ref={revealNameInput} type="text" name="name" />
          </StyledLabel>
        </p>
        <p>
          <StyledLabel ref={revealMailLabel}>
            Your Email: <StyledInput ref={revealMailInput} type="email" name="email" />
          </StyledLabel>
        </p>
        <p>
          <StyledLabel ref={revealMessageLabel}>
            Message: <StyledTextArea ref={revealMessageInput} name="message" />
          </StyledLabel>
        </p>
        <p>
          <StyledMoreButton ref={revealButton} type="submit">
            Send
          </StyledMoreButton>
        </p>
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
