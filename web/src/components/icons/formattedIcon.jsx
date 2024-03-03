import React from 'react';
import PropTypes from 'prop-types';
import { IconGitHub, IconLinkedin } from '@components/icons';

function FormattedIcon({ name }) {
    switch (name) {
        case 'GitHub':
            return <IconGitHub />;
        case 'Linkedin':
            return <IconLinkedin />;
        default:
            return <IconGitHub />;
    }
}

FormattedIcon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default FormattedIcon;
