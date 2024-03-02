import { PortableText } from '@portabletext/react';
import clientConfig from '../../client-config';

import Figure from './figure';

const components = {
    types: {
        figure: Figure,
    },
};

const PortableTextBlock = ({ value }) => (
    <PortableText value={value} components={components} {...clientConfig.sanity} />
);

export default PortableTextBlock;
