import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { sr } from '@utils';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, Button } from '@styles';
import { PortableTextBlock } from '@components';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 20px;

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

    &::before {
        bottom: 0;
        font-size: ${fontSizes.sm};
        ${media.desktop`font-size: ${fontSizes.smish};`};
    }

    &::after {
        display: none;
    }
`;

const StyledTitle = styled.h4`
    margin: 0 0 20px;
    font-size: 60px;
    ${media.desktop`font-size: 50px;`};
    ${media.tablet`font-size: 40px;`};
`;

const StyledDescriptionWrapper = styled.div``;

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

function Contact({ data }) {
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
    useLayoutEffect(() => {
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

            <StyledDescriptionWrapper ref={revealDescription}>
                {_rawDescription && <PortableTextBlock value={_rawDescription || []} />}
            </StyledDescriptionWrapper>

            <script src="https://unpkg.com/@botpoison/browser" async></script>

            <StyledForm
                name="contact"
                action="https://submit-form.com/TxKOmyYThxTKFA1XKXtkD"
                target="_self"
                data-botpoison-public-key="pk_a327ab01-fc7b-4bb8-8550-6fd0c62f80a2"
            >
                <input
                    type="checkbox"
                    name="_honeypot"
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                />
                <input type="hidden" name="_redirect" value="https://severinmueller.io/success" />
                <p>
                    <StyledLabel ref={revealNameLabel}>
                        Your Name:
                        <StyledInput
                            ref={revealNameInput}
                            type="text"
                            name="name"
                            autoComplete="name"
                        />
                    </StyledLabel>
                </p>
                <p>
                    <StyledLabel ref={revealMailLabel}>
                        Your Email:{' '}
                        <StyledInput
                            ref={revealMailInput}
                            type="email"
                            name="email"
                            autoComplete="email"
                        />
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
        </StyledContainer>
    );
}

Contact.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Contact;
