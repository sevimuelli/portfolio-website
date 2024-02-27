export default {
    name: 'aboutMe',
    title: 'About me',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            title: 'Photo',
            name: 'photo',
            type: 'figure',
        },
        {
            name: 'description',
            title: 'Description',
            description: 'Some text about me.',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            title: 'Worktitle',
            name: 'workTitle',
            type: 'string',
        },
        {
            name: 'workplaces',
            title: 'Workplaces',
            description: 'Where did i work.',
            type: 'array',
            of: [{ type: 'work' }],
        },
        {
            title: 'My files',
            name: 'myFiles',
            type: 'array',
            of: [{ type: 'fileUpload' }],
        },
        {
            title: 'Skills',
            name: 'skills',
            type: 'array',
            of: [{ type: 'skill' }],
        },
        {
            title: 'Other skills',
            name: 'otherSkills',
            type: 'array',
            of: [{ type: 'string' }],
        },
    ],
};
