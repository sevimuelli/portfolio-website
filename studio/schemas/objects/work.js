export default {
  type: 'object',
  name: 'work',
  title: 'Work',
  fields: [
    {
      title: 'Company',
      name: 'company',
      type: 'string',
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string'
    },
    {
      title: 'Tasks',
      name: 'tasks',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'startedAt',
      title: 'Started at',
      type: 'date'
    },
    {
      name: 'endedAt',
      title: 'Ended at',
      type: 'date'
    },
    {
      name: 'present',
      title: 'Present?',
      type: 'boolean'
    }
  ],
}
