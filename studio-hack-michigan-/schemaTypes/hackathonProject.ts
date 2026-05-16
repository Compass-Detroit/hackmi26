import {defineField, defineType} from 'sanity'
import {portableTextPlainLength} from './portableTextUtils'

/** Plain-text character cap for portable text `description` — keep in sync with `src/lib/portableText.ts`. */
const DESCRIPTION_MAX_CHARS = 5000

export const hackathonProjectType = defineType({
  name: 'hackathonProject',
  title: 'Hackathon Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Project Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      type: 'reference',
      to: [{type: 'team'}],
      title: 'Team Name',
      description: 'The team that created this project.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Project Description',
      description: `Rich text. Plain text must be ${DESCRIPTION_MAX_CHARS} characters or fewer.`,
      validation: (Rule) =>
        Rule.custom((blocks) => {
          const len = portableTextPlainLength(blocks)
          if (len > DESCRIPTION_MAX_CHARS) {
            return `Description is too long (${len} characters). Maximum is ${DESCRIPTION_MAX_CHARS}.`
          }
          return true
        }),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Project Image/Screenshot',
      options: {hotspot: true},
    }),
    defineField({
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub Repository',
    }),
    defineField({
      name: 'demoUrl',
      type: 'url',
      title: 'Live Demo Link',
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Project Video/Demo Link (e.g. YouTube, Loom)',
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Tech Stack',
    }),
    defineField({
      name: 'track',
      type: 'string',
      title: 'Hackathon Track (e.g. Best AI, Best UX)',
    }),
  ],
})
