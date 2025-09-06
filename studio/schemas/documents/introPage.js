export default {
    name: 'introPage',
    title: 'Intro page',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Subitle',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            description: 'Describe your portfolio for search engines and social media.',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
};
