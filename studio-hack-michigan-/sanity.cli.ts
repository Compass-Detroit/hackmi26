import {defineCliConfig} from 'sanity/cli'
import {sanityEnv} from './sanity.env'

export default defineCliConfig({
  api: {
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'rzbh3220sid8ktsiaccbr45q',
  },
})
