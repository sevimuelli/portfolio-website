import { PortableText } from '@portabletext/react'
import React from 'react';
import clientConfig from '../../client-config';
import components from './components';

// const BlockContent = ({ blocks }) => (
//   <BasePortableTextBlock value={blocks} serializers={serializers} {...clientConfig.sanity} />
// );

// export default BlockContent;

const PortableTextBlock = ({ value }) => (
  <PortableText value={value} components={components} {...clientConfig.sanity} />
);

export default PortableTextBlock;
