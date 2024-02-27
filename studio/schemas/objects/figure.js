export default {
    name: 'figure',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        {
            title: 'Caption',
            name: 'caption',
            type: 'string',
        },
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            validation: (Rule) =>
                Rule.error('You have to fill out the alternative text.').required(),
            description: 'Important for SEO and accessiblity.',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            caption: 'caption',
            order: 'order',
        },
        prepare({ imageUrl, caption, order }) {
            const title = order ? `(${order}) ${caption}` : caption;
            return {
                imageUrl,
                title,
            };
        },
    },
};
