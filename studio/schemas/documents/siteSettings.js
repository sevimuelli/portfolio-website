export default {
    name: 'siteSettings',
    type: 'document',
    title: 'Site Settings',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Describe your portfolio for search engines and social media.',
        },
        {
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            description: 'Add keywords that describes your portfolio.',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },
        {
            name: 'author',
            type: 'reference',
            description: 'Publish an author and set a reference to them here.',
            title: 'Author',
            to: [{ type: 'person' }],
        },
        {
            title: 'Rive loading screen',
            name: 'loadingScreen',
            type: 'file',
        },
    ],
};
