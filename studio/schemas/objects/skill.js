export default {
    type: 'object',
    name: 'skill',
    title: 'Skill',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Level',
            name: 'level',
            type: 'number',
            validation: (Rule) => Rule.required().min(0).max(10).positive().integer(),
        },
        {
            title: 'Icon',
            name: 'icon',
            type: 'figure',
        },
    ],
};
