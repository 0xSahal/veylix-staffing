import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Veylix Staffing',

  projectId: 'fx13psp7',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema,
})
