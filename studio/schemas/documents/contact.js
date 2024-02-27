export default {
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            title: 'Foto',
            name: 'foto',
            type: 'figure',
        },
        {
            name: 'description',
            title: 'Description',
            description: 'Some text in the contact section',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'gitHubLink',
            title: 'GitHub-Link',
            type: 'url',
        },
        {
            name: 'linkedIn',
            title: 'LinkedIn',
            type: 'url',
        },
        {
            name: 'stackoverflow',
            title: 'Stackoverflow',
            type: 'url',
        },
    ],
};
