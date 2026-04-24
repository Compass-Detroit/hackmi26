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
            defineField({
              name: 'name',
              type: 'string',
              title: 'Full Name',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'Role (e.g. Lead Dev, Designer)',
            }),
            defineField({
              name: 'github',
              type: 'url',
              title: 'GitHub',
              description: 'Optional — profile or repo URL',
            }),
            defineField({
              name: 'linkedin',
              type: 'url',
              title: 'LinkedIn',
              description: 'Optional',
            }),
            defineField({
              name: 'twitter',
              type: 'url',
              title: 'X (Twitter)',
              description: 'Optional — profile URL',
            }),
            defineField({
              name: 'bluesky',
              type: 'url',
              title: 'Bluesky',
              description: 'Optional — e.g. https://bsky.app/profile/…',
            }),
            defineField({
              name: 'mastodon',
              type: 'url',
              title: 'Mastodon',
              description: 'Optional — full profile URL',
            }),
            defineField({
              name: 'instagram',
              type: 'url',
              title: 'Instagram',
              description: 'Optional',
            }),
            defineField({
              name: 'website',
              type: 'url',
              title: 'Personal website',
              description: 'Optional — portfolio or homepage',
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role'},
          },
        },
      ],
    }),
  ],
})
