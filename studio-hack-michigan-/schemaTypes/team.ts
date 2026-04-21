import {defineField, defineType} from 'sanity'

export const teamType = defineType({
  name: 'team',
  title: 'Hackathon Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Full Name'},
            {name: 'role', type: 'string', title: 'Role (e.g. Lead Dev, Designer)'},
            {name: 'github', type: 'url', title: 'GitHub Profile'},
          ],
        },
      ],
    }),
  ],
})
