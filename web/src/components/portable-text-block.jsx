import React from 'react';
import PropTypes from 'prop-types';
import { PortableText } from '@portabletext/react';
import clientConfig from '../../client-config';

import Figure from './figure';

const components = {
    types: {
        figure: Figure,
    },
};

function PortableTextBlock({ value }) {
    return (
        <PortableText
            value={value}
            components={components}
            projectId={clientConfig.sanity.projectId}
            dataset={clientConfig.sanity.dataset}
        />
    );
}

PortableTextBlock.propTypes = {
    value: PropTypes.array.isRequired,
};

export default PortableTextBlock;
