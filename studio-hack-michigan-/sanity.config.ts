import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {sanityEnv} from './sanity.env'

export default defineConfig({
  name: 'default',
  title: 'Hack Michigan 2026',

  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
