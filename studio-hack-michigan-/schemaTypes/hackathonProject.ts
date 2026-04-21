import {defineField, defineType} from 'sanity'

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
