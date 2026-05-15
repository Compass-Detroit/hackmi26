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
      title: 'Team Logo (Optional)',
      description:
        'Optional. Wide logo recommended: 600×300 px (or similar 2:1 aspect). PNG or SVG with a transparent background works well.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'teamDescription',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Team Description (Optional)',
      description: `Rich text. Plain text must be 1000 characters or fewer.`,
      validation: (Rule) =>
        Rule.custom((blocks) => {
          const len = blocks ? blocks.length : 0
          return len <= 1000
            ? true
            : `Team description is too long (${len} characters). Maximum is 1000 characters.`
        }),
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
